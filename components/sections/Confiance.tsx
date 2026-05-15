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
import { SectionReveal } from '@/components/ui/SectionReveal';
import { GARANTIES, type Garantie } from '@/data/garanties';

/** Map nom d'icône (data) → composant lucide. */
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
 * Présente les garanties officielles (Atout France, APST, RCP AXA, Selectour…)
 * via icônes minimalistes. Pas de logos officiels (RGPD / droits d'image).
 */
export function Confiance() {
  return (
    <section
      id="confiance"
      className="bg-navy py-24 text-cream"
      aria-label="Garanties et engagements"
    >
      <Container>
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
    </section>
  );
}
