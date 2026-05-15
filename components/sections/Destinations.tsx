'use client';

import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { DESTINATIONS, type Destination } from '@/data/destinations';
import { CLICRDV_URL } from '@/lib/utils';

const CARD_WIDTH = 380; // px — doit matcher la largeur de la carte

export function Destinations() {
  const trackRef = useRef<HTMLUListElement | null>(null);

  // Snap horizontal sur écrans <= md, scroll programmatique pour les boutons.
  const scrollBy = (direction: 1 | -1) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction * (CARD_WIDTH + 16),
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="destinations"
      className="bg-bone py-24 md:py-32"
      aria-label="Destinations du moment"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionReveal className="max-w-2xl">
            <Eyebrow>En ce moment</Eyebrow>
            <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
              Les destinations qu’on aime ce mois-ci.
            </h2>
          </SectionReveal>

          {/* Contrôles slider — discrets, en haut-droite */}
          <div className="flex gap-2">
            <SliderButton
              direction="prev"
              ariaLabel="Voir les destinations précédentes"
              onClick={() => scrollBy(-1)}
            />
            <SliderButton
              direction="next"
              ariaLabel="Voir les destinations suivantes"
              onClick={() => scrollBy(1)}
            />
          </div>
        </div>
      </Container>

      {/* Track — on sort du container pour pouvoir bleed à droite/gauche */}
      <div className="mt-12">
        <ul
          ref={trackRef}
          className="snap-row flex w-full gap-4 overflow-x-auto px-[clamp(16px,4vw,64px)] pb-2"
          aria-label="Liste des destinations du moment"
        >
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SliderButton({
  direction,
  ariaLabel,
  onClick,
}: {
  direction: 'prev' | 'next';
  ariaLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/15 bg-cream text-charcoal transition-all duration-200 hover:border-petrol hover:text-petrol"
    >
      {direction === 'prev' ? (
        <ArrowLeft size={18} aria-hidden="true" />
      ) : (
        <ArrowRight size={18} aria-hidden="true" />
      )}
    </button>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <li
      className="snap-item group flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl bg-cream md:w-[380px]"
      style={{ flexBasis: 'auto' }}
    >
      {/* Image ratio 3:4 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal/10">
        <Image
          src={destination.image}
          alt={destination.alt}
          fill
          sizes="(max-width: 768px) 80vw, 380px"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105 motion-reduce:transform-none"
        />
      </div>

      {/* Bloc texte */}
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta">
          {destination.tag}
        </span>
        <h3 className="mt-3 font-display text-[clamp(28px,3vw,36px)] uppercase leading-[1] text-charcoal">
          {destination.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-slate">
          {destination.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-charcoal/10 pt-4">
          <a
            href={CLICRDV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-petrol transition-colors hover:text-petrol-dark"
          >
            Voir l’offre
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          {destination.until && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-slate">
              <Star size={11} aria-hidden="true" />
              {destination.until}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
