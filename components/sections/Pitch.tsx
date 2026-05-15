import { Container } from '@/components/ui/Container';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '@/data/avis';

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: '85', label: 'destinations dans le monde' },
  { value: '1952', label: 'année de fondation du réseau' },
  { value: `${GOOGLE_RATING}/5`, label: `sur Google · ${GOOGLE_REVIEWS_COUNT} avis` },
];

export function Pitch() {
  return (
    <section className="bg-cream py-24" aria-label="Quelques chiffres">
      <Container>
        <SectionReveal>
          <ul className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
            {STATS.map((s, i) => (
              <li
                key={s.label}
                className={`flex flex-col items-center text-center md:px-8 ${
                  i > 0 ? 'md:border-l md:border-charcoal/15' : ''
                }`}
              >
                <span className="font-mono text-mono-xl tabular-nums text-navy">
                  {s.value}
                </span>
                <span className="mt-3 max-w-[220px] font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </Container>
    </section>
  );
}
