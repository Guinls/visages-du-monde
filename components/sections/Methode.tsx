import { Compass, type LucideIcon, MessageCircle, Plane, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { METHODE, type MethodeStep } from '@/data/methode';

const ICON_MAP: Record<MethodeStep['icon'], LucideIcon> = {
  messageCircle: MessageCircle,
  compass: Compass,
  shieldCheck: ShieldCheck,
  plane: Plane,
};

export function Methode() {
  return (
    <section className="bg-cream py-24 md:py-32" aria-label="Notre méthode">
      <Container>
        <SectionReveal className="max-w-3xl">
          <Eyebrow>Méthode</Eyebrow>
          <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
            Votre voyage en quatre temps.
          </h2>
        </SectionReveal>

        <ol className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {METHODE.map((s, i) => {
            const Icon = ICON_MAP[s.icon];
            return (
              <li key={s.num} className="flex flex-col">
                <SectionReveal delay={i * 0.08}>
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-petrol"
                    aria-hidden="true"
                  />
                  <span className="mt-4 block font-mono text-mono-lg tabular-nums leading-none text-navy">
                    {s.num}
                  </span>
                  <h3 className="mt-4 font-display text-display-3 uppercase text-charcoal">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[280px] text-[15px] leading-relaxed text-slate">
                    {s.description}
                  </p>
                </SectionReveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
