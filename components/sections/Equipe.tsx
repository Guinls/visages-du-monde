import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { CLICRDV_URL } from '@/lib/utils';

const BULLETS = [
  'Spécialistes sur-mesure, circuits, séjours, croisières',
  'Réseau de partenaires éprouvés sur les 5 continents',
  'Assistance avant, pendant et après votre voyage',
];

/**
 * Section "L'agence" — anonymisée par choix éditorial.
 * On ne nomme pas les conseillères : on parle de "l'équipe", "nos conseillères".
 * Une carte d'équipe (photo + prénom + spécialité) pourra être ajoutée plus tard
 * en bas de section quand le shooting sera réalisé.
 */
export function Equipe() {
  return (
    <section id="agence" className="bg-bone py-24 md:py-32" aria-label="L'agence">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Photo atmosphérique — col gauche (≈40%) */}
          <SectionReveal className="lg:col-span-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-charcoal/5">
              <Image
                src="/photos/visages.png"
                alt="Atmosphère de l’agence Visages du Monde à Brest"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </SectionReveal>

          {/* Texte — col droite (≈60%) */}
          <SectionReveal className="lg:col-span-3 lg:pl-8" delay={0.1}>
            <Eyebrow>L’agence</Eyebrow>
            <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
              Une équipe à votre écoute, à Brest.
            </h2>
            <p className="mt-6 max-w-[560px] text-body-lg text-slate">
              Depuis notre agence de la rue Emile Zola, nos conseillères passionnées
              dessinent des voyages qui vous ressemblent. Une rencontre, une écoute,
              une réponse sur mesure — quelle que soit votre envie d’ailleurs.
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
              href={CLICRDV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-[14px] font-medium text-petrol underline decoration-petrol/40 underline-offset-[6px] transition-colors hover:text-petrol-dark hover:decoration-petrol"
            >
              Prendre rendez-vous avec un conseiller
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
