import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { HORAIRES } from '@/data/horaires';
import {
  AGENCE_ADDRESS,
  AGENCE_PHONE,
  AGENCE_PHONE_TEL,
  CLICRDV_URL,
} from '@/lib/utils';

/** Coordonnées de l'agence pour l'embed Google Maps et les directions. */
const { lat, lng } = AGENCE_ADDRESS;

// URL d'embed Maps "sans clé" — l'iframe par URL ne requiert pas de clé.
// Le bbox est centré sur l'agence avec un padding raisonnable.
const MAPS_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.005}%2C${lat - 0.003}%2C${lng + 0.005}%2C${lat + 0.003}&layer=mapnik&marker=${lat}%2C${lng}`;

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export function Agence() {
  return (
    <section
      id="contact"
      className="bg-navy py-24 text-cream md:py-32"
      aria-label="Venir nous voir"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Carte */}
          <SectionReveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-charcoal/40 lg:aspect-auto lg:h-full lg:min-h-[460px]">
              <iframe
                title={`Plan de l’agence — ${AGENCE_ADDRESS.street}, ${AGENCE_ADDRESS.city}`}
                src={MAPS_EMBED}
                className="absolute inset-0 h-full w-full grayscale-[0.3]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              {/* Marqueur custom en overlay au centre */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-petrol"
              >
                <MapPin size={32} fill="currentColor" strokeWidth={1} />
              </div>
            </div>
          </SectionReveal>

          {/* Infos */}
          <SectionReveal className="order-1 lg:order-2" delay={0.1}>
            <Eyebrow className="text-cream/70">L’agence</Eyebrow>
            <h2 className="mt-4 font-display text-display-1 uppercase">
              {AGENCE_ADDRESS.street},
              <br />
              {AGENCE_ADDRESS.city}.
            </h2>
            <p className="mt-3 text-[15px] text-cream/70">
              Tram Siam · à 5 min du centre
            </p>

            <dl className="mt-10 divide-y divide-cream/15 border-y border-cream/15">
              {HORAIRES.map((h) => (
                <div
                  key={h.label}
                  className="flex items-baseline justify-between gap-6 py-3 text-[14px]"
                >
                  <dt className="font-medium">{h.label}</dt>
                  <dd className="text-right text-cream/70">
                    {h.ferme ? (
                      <span className="italic">Fermé</span>
                    ) : (
                      <>
                        <span>{h.matin}</span>
                        {h.apresMidi && (
                          <>
                            <span className="mx-2 text-cream/30">/</span>
                            <span>{h.apresMidi}</span>
                          </>
                        )}
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <a
                href={`tel:${AGENCE_PHONE_TEL}`}
                className="block font-display text-[clamp(32px,4vw,52px)] uppercase tracking-tight text-cream transition-colors hover:text-petrol"
                aria-label={`Appeler l’agence au ${AGENCE_PHONE}`}
              >
                {AGENCE_PHONE}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                href={CLICRDV_URL}
                className="bg-cream text-navy hover:bg-white"
              >
                Prendre rendez-vous
                <Calendar size={18} aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={DIRECTIONS_URL}
                className="border-cream text-cream hover:bg-cream/10"
              >
                Itinéraire
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
