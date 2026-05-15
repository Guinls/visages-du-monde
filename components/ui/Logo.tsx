import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Logo officiel du réseau Visages du Monde.
 *
 * Le PNG (`/public/logo.png`) est la SEULE source de vérité graphique :
 * - Pas de recréation typographique en CSS/SVG
 * - Pas de filtre, recoloration ou transformation
 * - Affiché tel quel partout (header, footer, intro loader, info-card carte)
 *
 * Dimensions intrinsèques du fichier : 960 × 481 px (PNG détouré, fond
 * transparent — apparaît tel quel sur fond cream, photo hero, ou navy).
 * Le composant prend une `height` en pixels, la `width` se déduit du ratio.
 */
const SRC = '/logo.png';
const INTRINSIC_W = 960;
const INTRINSIC_H = 481;
const RATIO = INTRINSIC_W / INTRINSIC_H;

type LogoProps = {
  /** Hauteur en pixels. La largeur s'ajuste auto via le ratio. */
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
};

export function Logo({
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
      className={cn('block h-auto w-auto select-none', className)}
      style={{ height }}
    />
  );
}
