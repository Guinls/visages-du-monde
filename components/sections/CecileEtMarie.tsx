import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';

const BULLETS = [
  '15 ans d’expérience cumulée',
  'Réseau de partenaires éprouvés sur les 5 continents',
  'Assistance avant, pendant et après le voyage',
];

export function CecileEtMarie() {
  return (
    <section
      id="agence"
      className="bg-bone py-24 md:py-32"
      aria-label="L'agence — Cécile et Marie"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Photo — col gauche (≈40%) */}
          <SectionReveal className="lg:col-span-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-charcoal/5">
              <Image
                src="/photos/visages.png"
                alt="Cécile et Marie, conseillères voyages chez Visages du Monde Brest"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </SectionReveal>

          {/* Texte — col droite (≈60%) */}
          <SectionReveal className="lg:col-span-3 lg:pl-8" delay={0.1}>
            <Eyebrow>L’agence</Eyebrow>
            <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
              Cécile &amp; Marie,
              <br />
              conseillères voyages.
            </h2>
            <p className="mt-6 max-w-[560px] text-body-lg text-slate">
              Passionnées par leur métier, elles dessinent depuis Brest des voyages
              qui vous ressemblent. Une rencontre, une écoute, une réponse sur mesure —
              quelle que soit votre envie d’ailleurs.
            </p>

            <ul className="mt-8 space-y-3 text-[16px] text-charcoal">
              {BULLETS.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden="true" className="select-none text-petrol">
                    —
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 text-[14px] font-medium text-petrol underline decoration-petrol/40 underline-offset-[6px] transition-colors hover:text-petrol-dark hover:decoration-petrol"
            >
              Rencontrer l’équipe
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
