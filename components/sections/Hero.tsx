'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Calendar, ChevronDown, Phone } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AGENCE_PHONE, AGENCE_PHONE_TEL, CLICRDV_URL } from '@/lib/utils';

type Slide = {
  image: string;
  alt: string;
  /** Override CSS `object-position` (utile pour les photos portrait où le sujet
   *  principal n'est pas centré verticalement). Défaut : "50% 50%". */
  objectPosition?: string;
};

/**
 * Slides full-bleed — 5 photos sélectionnées pour leur diversité d'ambiance
 * (montagne / plage / culture / nordique / chaleureux).
 */
const SLIDES: Slide[] = [
  {
    image: '/photos/turquie.jpg',
    alt: 'Montgolfières au lever du soleil au-dessus de la Cappadoce, Turquie',
  },
  {
    image: '/photos/islande.jpg',
    alt: 'Montagne enneigée se reflétant dans un fjord, Islande',
  },
  {
    image: '/photos/plongeon-cenote.jpg',
    alt: 'Plongeur en suspension dans un cenote turquoise, Mexique',
  },
  {
    image: '/photos/statue-asie.jpg',
    alt: 'Statue dorée monumentale et escaliers colorés, Batu Caves, Malaisie',
    // La statue (et donc la tête) sont dans le tiers supérieur du cadre
    // portrait — on remonte le crop pour ne pas couper la tête en object-cover.
    objectPosition: '50% 25%',
  },
  {
    image: '/photos/auroresboreales.jpg',
    alt: 'Aurore boréale au-dessus d’un paysage côtier',
  },
];

const ROTATION_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Auto-rotation toutes les 6s
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-charcoal"
      aria-label="Présentation Visages du Monde"
    >
      {/* Slides empilées — crossfade via AnimatePresence */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeInOut' }}
          aria-live="polite"
        >
          <Image
            src={SLIDES[index].image}
            alt={SLIDES[index].alt}
            fill
            priority={index === 0}
            quality={85}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: SLIDES[index].objectPosition ?? '50% 50%' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay pour lisibilité du texte */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"
        aria-hidden="true"
      />

      {/* Bloc texte — centré-bas */}
      <Container className="relative z-10 flex h-full flex-col justify-end pb-32 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-[1100px]"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-cream/80">
            Agence de voyages à Brest — depuis 1952
          </p>
          <h1 className="mt-4 font-display text-hero uppercase text-cream">
            Chaque voyage commence ici.
          </h1>
          <p className="mt-6 max-w-[600px] text-body-lg text-cream/90">
            Une équipe locale, un réseau national de 42 agences, des voyages dessinés
            sur mesure.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href={CLICRDV_URL}>
              Prendre rendez-vous
              <Calendar size={18} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${AGENCE_PHONE_TEL}`}
              className="border-cream text-cream hover:bg-cream/10"
              aria-label={`Nous appeler au ${AGENCE_PHONE}`}
            >
              <Phone size={18} aria-hidden="true" />
              Nous appeler
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Indicateurs slider */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Aller au visuel ${i + 1} sur ${SLIDES.length}`}
            aria-current={i === index}
            className="group h-1 w-6 cursor-pointer overflow-hidden bg-cream/30"
          >
            <span
              className={`block h-full bg-cream transition-transform duration-500 ${
                i === index ? 'scale-x-100' : 'scale-x-0'
              } origin-left`}
            />
          </button>
        ))}
      </div>

      {/* Indicateur scroll en bas-centre, sous les dots */}
      <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-cream/70"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
}
