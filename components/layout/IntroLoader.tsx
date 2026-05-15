'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';

const STORAGE_KEY = 'vdm-intro-seen';
const TOTAL_DURATION_MS = 2400;

/**
 * IntroLoader — overlay plein écran joué une seule fois par session.
 *
 * Timeline (cf. spec) :
 *  0.0s  → overlay cream + globe wireframe (fade+scale)
 *  0.5s  → l'avion apparaît
 *  0.6s  → l'avion trace son orbite (path circulaire, 1.4s)
 *  1.6s  → logo VDM révélé sous le globe
 *  1.8s  → microcopy "Préparation de votre voyage…"
 *  2.0s  → fade-out global + sortie tangentielle de l'avion
 *  2.4s  → unmount, hero pleinement visible
 *
 * Si `prefers-reduced-motion: reduce` est actif, ou si la session a déjà vu
 * l'intro, le composant skip directement sans rien afficher.
 */
export function IntroLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  // tant que `mounted` est false, on n'affiche RIEN — évite le flash à l'hydratation
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Skip si déjà vu cette session ou si l'utilisateur préfère moins d'animation
    const alreadySeen =
      typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === '1';
    if (alreadySeen || reduceMotion) {
      return;
    }

    setVisible(true);
    // empêche le scroll pendant l'intro
    document.documentElement.style.overflow = 'hidden';
    sessionStorage.setItem(STORAGE_KEY, '1');

    const timeout = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = '';
    }, TOTAL_DURATION_MS);

    return () => {
      window.clearTimeout(timeout);
      document.documentElement.style.overflow = '';
    };
  }, [reduceMotion]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          // L'overlay reste opaque jusqu'à t=2s, puis fade-out 0.4s
          // (l'unmount tombe pile à t=2.4s grâce au setTimeout ci-dessus).
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{
            duration: 2.4,
            times: [0, 2.0 / 2.4, 1],
            ease: 'easeOut',
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
          role="status"
          aria-label="Chargement du site Visages du Monde"
        >
          <div className="flex flex-col items-center">
            <GlobeAndPlane />
            <LogoReveal />
            <MicrocopyReveal />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Globe wireframe + avion en orbite
   ───────────────────────────────────────────── */
function GlobeAndPlane() {
  return (
    <div className="relative h-[240px] w-[240px] md:h-[280px] md:w-[280px]">
      {/* Globe : apparaît (fade+scale 0.4s), puis spin Y infini */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="globe-spin">
          <GlobeSVG />
        </div>
      </motion.div>

      {/* Avion : 0% → 100% du path (orbite), puis sortie tangentielle */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 1, 0] }}
        transition={{
          duration: 2.0,
          times: [0, 0.25, 0.3, 0.95, 1.0, 1.0],
          ease: 'linear',
        }}
      >
        <PlaneOrbit />
      </motion.div>

      {/* Styles inline pour l'animation propre au composant —
          on évite de polluer Tailwind avec des keyframes one-shot */}
      <style jsx>{`
        .globe-spin {
          animation: globeSpin 8s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes globeSpin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .globe-spin {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/** SVG wireframe : un cercle, 6 méridiens (ellipses), 4 parallèles. */
function GlobeSVG() {
  return (
    <svg
      width="160"
      height="160"
      viewBox="-100 -100 200 200"
      fill="none"
      stroke="#1499C7"
      strokeWidth="1.5"
      aria-hidden="true"
      role="img"
    >
      {/* Cercle principal (équateur de face) */}
      <circle cx="0" cy="0" r="80" />

      {/* 4 parallèles : ellipses aplaties horizontalement */}
      <ellipse cx="0" cy="-50" rx="62.5" ry="10" />
      <ellipse cx="0" cy="-20" rx="77.5" ry="14" />
      <ellipse cx="0" cy="20" rx="77.5" ry="14" />
      <ellipse cx="0" cy="50" rx="62.5" ry="10" />

      {/* 6 méridiens : ellipses verticales (rx variable) tournées */}
      <ellipse cx="0" cy="0" rx="80" ry="20" />
      <ellipse cx="0" cy="0" rx="80" ry="40" />
      <ellipse cx="0" cy="0" rx="80" ry="60" />
      <ellipse cx="0" cy="0" rx="80" ry="80" />
      <line x1="0" y1="-80" x2="0" y2="80" />
    </svg>
  );
}

/** Avion qui suit une orbite circulaire autour du globe. */
function PlaneOrbit() {
  // Rayon de l'orbite (en coordonnées SVG locales — viewBox 240×240)
  return (
    <svg
      viewBox="0 0 240 240"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* Trace pointillée — devient visible avec l'avion, s'estompe ensuite */}
      <motion.circle
        cx="120"
        cy="120"
        r="110"
        fill="none"
        stroke="#1499C7"
        strokeWidth="1"
        strokeDasharray="4 6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.4, 0] }}
        transition={{
          duration: 2.0,
          times: [0, 0.3, 0.9, 1],
          ease: 'easeOut',
        }}
      />
      {/* Avion : on anime un <g> en rotation autour du centre,
          l'avion lui-même est positionné à r=110 sur l'axe vertical
          de ce groupe (pour rester tangent à la trajectoire). */}
      <motion.g
        style={{ transformOrigin: '120px 120px' }}
        initial={{ rotate: -90 }}
        animate={{ rotate: 270 }}
        transition={{
          delay: 0.6,
          duration: 1.4,
          ease: [0.4, 0, 0.6, 1],
        }}
      >
        {/* Avion à 0,10 dans le groupe → r=110 par rapport au centre 120,120
            (on positionne le groupe puis l'avion à -10 sur Y). */}
        <g transform="translate(120, 10)">
          <PlaneIcon />
        </g>
      </motion.g>
    </svg>
  );
}

/** Petite icône avion stylisée (silhouette plein navy, tangentielle). */
function PlaneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="-12 -12 24 24"
      // L'avion pointe vers la droite (sens de progression sur l'orbite)
      // → on le tourne de 90° pour qu'il pointe dans le sens horaire
      style={{ overflow: 'visible' }}
      x="-10"
      y="-10"
    >
      <path
        d="M 10 0 L -8 -6 L -3 0 L -8 6 Z"
        fill="#0A3B5C"
        transform="rotate(90)"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Logo officiel "visages du monde" — apparaît à t=1.6s.
   On utilise le composant <Logo /> (asset PNG/SVG fourni),
   pas une recréation typographique en CSS.
   ───────────────────────────────────────────── */
function LogoReveal() {
  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.4, ease: 'easeOut' }}
    >
      <Logo height={64} alt="Visages du Monde" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Microcopy "Préparation de votre voyage…"
   ───────────────────────────────────────────── */
function MicrocopyReveal() {
  return (
    <motion.p
      className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-slate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.3 }}
    >
      Préparation de votre voyage…
    </motion.p>
  );
}
