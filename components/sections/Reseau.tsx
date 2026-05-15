import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { RESEAU_BRETAGNE, VDM_NATIONAL_URL, VDM_NETWORK } from '@/data/reseau';

/**
 * Section "Le réseau Visages du Monde".
 * Argument d'autorité : on est local ET adossé à un réseau national.
 * Choix v1 : liste textuelle élégante des agences bretonnes.
 * Une carte SVG France stylisée pourra remplacer la liste en v2 quand on aura
 * les coordonnées exactes des 42 agences.
 */
export function Reseau() {
  return (
    <section
      id="reseau"
      className="bg-cream py-24 md:py-32"
      aria-label="Le réseau Visages du Monde"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Bloc texte */}
          <SectionReveal className="lg:col-span-5">
            <Eyebrow>Le réseau</Eyebrow>
            <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
              {VDM_NETWORK.agencesFrance} agences en France,
              <br />
              {VDM_NETWORK.agencesBretagne} en Bretagne.
            </h2>
            <p className="mt-6 max-w-[460px] text-body-lg text-slate">
              Notre agence brestoise fait partie du réseau Visages du Monde, présent
              dans toute la France depuis {VDM_NETWORK.anneeFondation}. Une force
              commune, une expertise partagée, une proximité locale.
            </p>
          </SectionReveal>

          {/* Liste agences */}
          <SectionReveal className="lg:col-span-7" delay={0.1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
              Nos agences en Bretagne
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              {RESEAU_BRETAGNE.map((ville) => (
                <li
                  key={ville}
                  className="flex items-baseline gap-3 border-b border-charcoal/10 pb-3 text-[16px] text-charcoal"
                >
                  <span
                    aria-hidden="true"
                    className={
                      ville === 'Brest'
                        ? 'h-1.5 w-1.5 rounded-full bg-petrol'
                        : 'h-1 w-1 rounded-full bg-charcoal/30'
                    }
                  />
                  <span className={ville === 'Brest' ? 'font-medium text-petrol' : ''}>
                    {ville}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={VDM_NATIONAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-[14px] font-medium text-petrol underline decoration-petrol/40 underline-offset-[6px] transition-colors hover:text-petrol-dark hover:decoration-petrol"
            >
              Voir toutes les agences sur visagesdumonde.fr
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
