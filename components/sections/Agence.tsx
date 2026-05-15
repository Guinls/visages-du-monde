import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Logo } from '@/components/ui/Logo';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { HORAIRES } from '@/data/horaires';
import {
  AGENCE_ADDRESS,
  AGENCE_PHONE,
  AGENCE_PHONE_TEL,
  CLICRDV_URL,
} from '@/lib/utils';

/**
 * Carte intégrée — iframe Google Maps "search embed", sans clé API.
 *
 * URL utilisée :
 *   https://maps.google.com/maps?q={address}&t=&z=15&ie=UTF8&iwloc=&output=embed
 *
 * Pourquoi pas la Maps Embed API officielle ?
 *   → elle exige une clé API (et donc une facturation potentielle, une fuite
 *     possible en clair côté client). On reste sur le "search embed" historique
 *     tant qu'il est servi par Google.
 *
 * NOTE FUTURE — remplacer cette iframe par un composant Mapbox GL JS custom
 * (style sépia/navy, marker SVG reprenant la "lune" du logo VDM) dès que le
 * compte Mapbox CRUX STUDIO sera configuré. Le swap se fait UNIQUEMENT dans
 * ce fichier, aucun impact ailleurs.
 */
const MAPS_QUERY = encodeURIComponent(
  `${AGENCE_ADDRESS.street}, ${AGENCE_ADDRESS.postalCode} ${AGENCE_ADDRESS.city}`,
);
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir//${MAPS_QUERY}`;

export function Agence() {
  return (
    <section
      id="contact"
      className="bg-navy py-24 text-cream md:py-32"
      aria-label="Venir nous voir"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* ─── Carte (60% desktop) ─────────────────────────── */}
          <SectionReveal className="order-2 lg:order-1 lg:col-span-3">
            <MapWithOverlay />
          </SectionReveal>

          {/* ─── Infos (40% desktop) ─────────────────────────── */}
          <SectionReveal className="order-1 lg:order-2 lg:col-span-2" delay={0.1}>
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

/* ─────────────────────────────────────────────────────────────────
   <MapWithOverlay /> — iframe + carte info en surimpression
   ───────────────────────────────────────────────────────────────── */

function MapWithOverlay() {
  return (
    <div className="relative">
      {/* Conteneur de la map */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-charcoal/40 md:h-[480px]">
        <iframe
          title="Carte de localisation de Visages du Monde Brest"
          src={MAPS_EMBED_URL}
          className="absolute inset-0 h-full w-full"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // L'iframe Google Maps n'expose pas d'API ; l'attribut allow vide
          // évite d'autoriser des permissions par défaut.
          allow=""
        />

        {/* Overlay info-card — desktop UNIQUEMENT (position absolute) */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <InfoCard className="pointer-events-auto absolute bottom-6 left-6 max-w-[320px]" />
        </div>
      </div>

      {/* Overlay info-card — mobile (sous la carte, en remontée légère) */}
      <div className="md:hidden">
        <InfoCard className="relative z-10 -mt-4 mx-4" />
      </div>
    </div>
  );
}

function InfoCard({ className = '' }: { className?: string }) {
  return (
    <article
      className={`rounded-2xl bg-cream p-6 text-charcoal shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)] ${className}`}
    >
      <Logo height={24} />
      <h3 className="mt-4 font-display text-[22px] uppercase leading-tight">
        Visages du Monde Brest
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-slate">
        {AGENCE_ADDRESS.street}
        <br />
        {AGENCE_ADDRESS.postalCode} {AGENCE_ADDRESS.city}
      </p>
      <p className="mt-1 text-[12px] text-slate/80">Tram Siam</p>

      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-petrol px-5 py-3 text-[14px] font-medium text-cream transition-all duration-200 hover:bg-petrol-dark hover:scale-[1.02] hover:shadow-[0_8px_24px_-12px_rgba(20,153,199,0.6)]"
      >
        Itinéraire
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
