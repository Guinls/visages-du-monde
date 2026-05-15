import { Compass, MessageCircle, Plane, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';

type Step = {
  num: string;
  icon: ReactNode;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    num: '01',
    icon: <MessageCircle strokeWidth={1.5} size={28} aria-hidden="true" />,
    title: 'Rencontre',
    description:
      'En agence, par téléphone ou en visio. On écoute vos envies, votre budget, vos contraintes.',
  },
  {
    num: '02',
    icon: <Compass strokeWidth={1.5} size={28} aria-hidden="true" />,
    title: 'Conception',
    description:
      'On dessine plusieurs propositions sur mesure, on ajuste jusqu’à ce que ça vous parle.',
  },
  {
    num: '03',
    icon: <ShieldCheck strokeWidth={1.5} size={28} aria-hidden="true" />,
    title: 'Réservation',
    description:
      'Tout est sécurisé : vols, hôtels, prestations, assurances. Vous n’avez plus qu’à préparer votre valise.',
  },
  {
    num: '04',
    icon: <Plane strokeWidth={1.5} size={28} aria-hidden="true" />,
    title: 'Accompagnement',
    description:
      'Avant, pendant, après. Un imprévu en voyage ? On est joignables.',
  },
];

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
          {STEPS.map((s, i) => (
            <li key={s.num} className="flex flex-col">
              <SectionReveal delay={i * 0.08}>
                <span className="text-petrol">{s.icon}</span>
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
          ))}
        </ol>
      </Container>
    </section>
  );
}
