import { ArrowRight, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { AVIS, GOOGLE_RATING, GOOGLE_REVIEWS_COUNT, GOOGLE_REVIEWS_URL } from '@/data/avis';

export function Avis() {
  return (
    <section
      id="avis"
      className="bg-bone py-24 md:py-32"
      aria-label="Avis de nos voyageurs"
    >
      <Container>
        <SectionReveal className="max-w-3xl">
          <Eyebrow>Avis</Eyebrow>
          <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
            {GOOGLE_RATING}/5 sur Google.
          </h2>
          <p className="mt-5 text-body-lg text-slate">
            {GOOGLE_REVIEWS_COUNT} voyageurs ont laissé leur ressenti. En voici quelques-uns.
          </p>
        </SectionReveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AVIS.map((a, i) => (
            <li key={a.id} className="flex h-full flex-col rounded-2xl bg-cream p-8">
              <SectionReveal delay={i * 0.08} className="flex h-full flex-col">
                {/* Étoiles terracotta */}
                <div className="flex gap-1 text-terracotta" aria-label={`Note ${a.rating} sur 5`}>
                  {Array.from({ length: a.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1 text-[18px] italic leading-relaxed text-charcoal">
                  « {a.quote} »
                </blockquote>

                <footer className="mt-6 border-t border-charcoal/10 pt-4 text-[13px] text-slate">
                  <span className="font-medium text-charcoal">{a.author}</span>{' '}
                  <span className="mx-1 text-charcoal/30">·</span> {a.date}
                </footer>
              </SectionReveal>
            </li>
          ))}
        </ul>

        <SectionReveal className="mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-petrol underline decoration-petrol/40 underline-offset-[6px] transition-colors hover:text-petrol-dark hover:decoration-petrol"
          >
            Lire tous les avis sur Google
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </SectionReveal>
      </Container>
    </section>
  );
}
