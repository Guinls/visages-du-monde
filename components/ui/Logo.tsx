import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  /**
   * `light` : version native (bleu pétrole #1499C7) — à utiliser sur fonds
   *   clairs (cream, bone).
   * `dark`  : version cream/blanche obtenue par filtre CSS — à utiliser sur
   *   fonds sombres ou par-dessus une photo (hero, footer, nav transparente).
   *
   * NB : la "version sombre" est un filtre `brightness(0) invert(1)`,
   * qui marche tant que le logo est monochrome. Si Guillaume fournit
   * plus tard une variante SVG dédiée, on swap le chemin dans `darkSrc`.
   */
  variant?: 'light' | 'dark';
  /** Hauteur en pixels (la largeur s'ajuste auto via ratio). */
  height?: number;
  className?: string;
  /** Pas obligatoire mais utile en accessibility quand pas dans un <a> avec aria-label. */
  alt?: string;
  priority?: boolean;
};

/**
 * Composant Logo unique du site.
 *
 * ⚠️ ASSET À FOURNIR : `/public/logo.png`.
 *
 * Tant que Guillaume n'a pas posé le vrai PNG du réseau Visages du Monde,
 * on sert le SVG temporaire `/logo.svg` (typo recréée, non conforme à la
 * charte officielle). Pour basculer sur le vrai logo, il suffit de :
 *
 *   1. Poser `logo.png` (≥ 200px de haut, fond transparent) dans `/public/`
 *   2. Remplacer la constante `SRC` ci-dessous par `'/logo.png'`
 *   3. Ajuster `RATIO` (largeur / hauteur intrinsèques du PNG)
 */
const SRC = '/logo.svg';
const RATIO = 400 / 90; // largeur / hauteur du SVG actuel — à ajuster pour le PNG officiel

export function Logo({
  variant = 'light',
  height = 36,
  className,
  alt = 'Visages du Monde — Agence de voyages',
  priority = false,
}: LogoProps) {
  const width = Math.round(height * RATIO);

  return (
    <Image
      src={SRC}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      // Le SVG est unoptimized par défaut côté next/image (sécurité).
      // Avec un PNG, next/image générera WebP/AVIF automatiquement.
      unoptimized={SRC.endsWith('.svg')}
      className={cn(
        'block h-auto w-auto select-none',
        // Filtre pour la variante sombre — fonctionne car le logo est monochrome.
        variant === 'dark' && 'brightness-0 invert',
        className,
      )}
      style={{ height }}
    />
  );
}
