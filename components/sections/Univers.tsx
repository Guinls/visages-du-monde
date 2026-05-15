import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { UNIVERS } from '@/data/univers';

const SECONDARY_TAGS = [
  'voyages de noces',
  'golf',
  'bien-être',
  'Club Med',
  'sports',
  'groupes',
  'billetterie',
  'location véhicules',
];

export function Univers() {
  return (
    <section id="univers" className="bg-cream py-24 md:py-32" aria-label="Nos univers">
      <Container>
        <SectionReveal className="max-w-3xl">
          <Eyebrow>Nos univers</Eyebrow>
          <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
            Quatre façons de partir.
          </h2>
          <p className="mt-5 text-body-lg text-slate">
            Du week-end en Europe au safari en Tanzanie, chaque voyage est une histoire
            à écrire.
          </p>
        </SectionReveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {UNIVERS.map((u, i) => (
            <li
              key={u.id}
              className="group relative h-[360px] overflow-hidden rounded-2xl bg-charcoal md:h-[480px]"
            >
              <SectionReveal delay={(i % 2) * 0.08} className="h-full">
                <UniversCardInner
                  badge={u.badge}
                  title={u.title}
                  description={u.description}
                  image={u.image}
                  alt={u.alt}
                />
              </SectionReveal>
            </li>
          ))}
        </ul>

        <SectionReveal className="mt-10">
          <p className="text-[14px] text-slate">
            <span className="font-medium text-charcoal">Et aussi :</span>{' '}
            {SECONDARY_TAGS.join(' · ')}
          </p>
        </SectionReveal>
      </Container>
    </section>
  );
}

type CardProps = {
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

function UniversCardInner({ badge, title, description, image, alt }: CardProps) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105 motion-reduce:transform-none"
      />
      {/* Overlay gradient bas → haut */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/0 transition-opacity duration-500 group-hover:from-black/85"
      />
      {/* Texte aligné bas-gauche */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-cream md:p-8">
        <span className="inline-flex w-fit font-mono text-[11px] uppercase tracking-[0.2em] text-cream/90">
          {badge}
        </span>
        <h3 className="mt-3 max-w-[420px] font-display text-display-2 uppercase">
          {title}
        </h3>
        <p className="mt-3 max-w-[440px] text-[14px] leading-relaxed text-cream/85 md:text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}
