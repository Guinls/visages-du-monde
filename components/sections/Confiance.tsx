import {
  BadgeCheck,
  Building2,
  FileCheck2,
  type LucideIcon,
  Network,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PartnerLabels } from '@/components/ui/PartnerLabels';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { GARANTIES, type Garantie } from '@/data/garanties';

const ICON_MAP: Record<Garantie['icon'], LucideIcon> = {
  network: Network,
  badgeCheck: BadgeCheck,
  shieldCheck: ShieldCheck,
  fileCheck: FileCheck2,
  building: Building2,
  wallet: Wallet,
};

/**
 * Section "Pourquoi nous faire confiance" — fond navy.
 *
 * Composée en deux parties :
 *  A) Grille 3×2 des engagements avec icônes minimalistes (pas de logos
 *     officiels — droits d'image).
 *  B) Bande horizontale "Partenaires & certifications" (fond navy-dark
 *     plus profond) avec les 5 labels placeholders typographiques.
 *     Voir [components/ui/PartnerLabels.tsx] pour les détails.
 */
export function Confiance() {
  return (
    <section
      id="confiance"
      className="bg-navy text-cream"
      aria-label="Garanties et engagements"
    >
      {/* ─── PARTIE A — Grille d'engagements ───────────────────── */}
      <Container className="py-24">
        <SectionReveal className="max-w-3xl">
          <Eyebrow className="text-cream/70">Garanties &amp; engagements</Eyebrow>
          <h2 className="mt-4 font-display text-display-1 uppercase">
            Voyagez l’esprit tranquille.
          </h2>
          <p className="mt-5 text-body-lg text-cream/80">
            Nos engagements et les protections officielles dont vous bénéficiez.
          </p>
        </SectionReveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:gap-x-10">
          {GARANTIES.map((g, i) => {
            const Icon = ICON_MAP[g.icon];
            return (
              <li key={g.id}>
                <SectionReveal delay={(i % 3) * 0.05}>
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-cream"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-display-3 uppercase">
                    {g.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-cream/70">
                    {g.description}
                  </p>
                </SectionReveal>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* ─── PARTIE B — Bande logos partenaires (navy-dark) ─────── */}
      <div className="border-t border-cream/10 bg-navy-dark py-12">
        <Container>
          <SectionReveal>
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
              Partenaires &amp; certifications
            </p>
            <div className="mt-8">
              <PartnerLabels height={48} tone="cream" />
            </div>
          </SectionReveal>
        </Container>
      </div>
    </section>
  );
}
