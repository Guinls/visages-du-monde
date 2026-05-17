import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * ⚠️ PLACEHOLDERS TYPOGRAPHIQUES.
 *
 * Les fichiers `/public/labels/*.svg` ne sont PAS les logos officiels :
 * ce sont des placeholders neutres (nom de la marque en sans-serif générique).
 * Ils doivent être remplacés par les SVG officiels fournis par chaque
 * partenaire, avec autorisation d'usage, avant la mise en ligne définitive.
 */
const LABELS = [
  { id: 'visages-du-monde', label: 'Visages du Monde', src: '/labels/visages-du-monde.svg' },
  { id: 'selectour', label: 'Selectour', src: '/labels/selectour.svg' },
  { id: 'atout-france', label: 'Atout France — IM031100005', src: '/labels/atout-france.svg' },
  { id: 'apst', label: 'APST — Garantie financière', src: '/labels/apst.svg' },
  { id: 'axa', label: 'AXA — Assurance RCP', src: '/labels/axa.svg' },
] as const;

type PartnerLabelsProps = {
  /** Hauteur de chaque label en pixels (largeur calée sur le ratio intrinsèque). */
  height?: number;
  /** Couleur des labels (les SVG utilisent `currentColor`). */
  tone?: 'cream' | 'charcoal';
  className?: string;
};

/**
 * Bande horizontale des labels & certifications partenaires.
 * Factorisé pour être réutilisé dans la section "Confiance" (PARTIE B sur navy-dark)
 * et dans le Footer (Zone 2, version plus compacte).
 *
 * Comportement :
 * - État défaut : opacity 0.7, légèrement éteint
 * - Hover : opacity 1, transition 300ms
 * - Mobile : wrap automatique (flex-wrap), gap réduit
 */
export function PartnerLabels({
  height = 48,
  tone = 'cream',
  className,
}: PartnerLabelsProps) {
  // Largeur calculée pour le viewBox 200×48 → ratio 200/48 ≈ 4.17
  const width = Math.round(height * (200 / 48));

  return (
    <ul
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-10 gap-y-6',
        tone === 'cream' ? 'text-cream' : 'text-charcoal',
        className,
      )}
      aria-label="Garanties et certifications"
    >
      {LABELS.map((l) => (
        <li
          key={l.id}
          // État repos : brightness(0) + invert(1) force tous les logos en
          //   blanc cassé → visibilité homogène sur fond sombre (navy-dark
          //   en Confiance, charcoal en Footer).
          // Hover : on retire le filtre, les couleurs d'origine des logos
          //   officiels apparaissent (utile quand les vrais SVG remplaceront
          //   les placeholders typographiques).
          className="opacity-80 brightness-0 invert transition-all duration-300 hover:opacity-100 hover:brightness-100 hover:invert-0"
        >
          <Image
            src={l.src}
            alt={l.label}
            width={width}
            height={height}
            // SVG : pas d'optimisation Next, on garde le rendu vectoriel.
            unoptimized
            className="block h-auto w-auto"
            style={{ height }}
          />
        </li>
      ))}
    </ul>
  );
}
