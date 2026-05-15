import { ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';
import Image from 'next/image';
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
 * Section "Venir nous voir".
 *
 * ⚠️ Plus d'iframe Google Maps depuis la V2 du patch (RGPD).
 *
 * À la place, une image statique cliquable (`/photos/map-brest.jpg`) :
 * - Aucun cookie tiers tant que l'utilisateur ne clique pas
 * - Clic → ouvre Google Maps en nouvel onglet (itinéraire)
 * - Conforme RGPD sans bannière de consentement
 *
 * NOTE — La carte actuelle est un PLACEHOLDER généré par
 *   scripts/generate-map-placeholder.mjs (cream + marker pétrole stylisé).
 * À remplacer par une capture réelle de Google Maps centrée sur l'agence
 * (1200×800, marker dessiné). Même chemin/nom de fichier — un simple
 * écrasement suffit, aucun code à toucher.
 */
const DIRECTIONS_URL = `https://www.google.com/maps/dir//${encodeURIComponent(
  `${AGENCE_ADDRESS.street}, ${AGENCE_ADDRESS.postalCode} ${AGENCE_ADDRESS.city}`,
)}`;

export function Agence() {
  return (
    <section
      id="contact"
      className="bg-navy py-24 text-cream md:py-32"
      aria-label="Venir nous voir"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* ─── Carte cliquable (60% desktop) ─────────────────── */}
          <SectionReveal className="order-2 lg:order-1 lg:col-span-3">
            <ClickableMap />
          </SectionReveal>

          {/* ─── Infos canoniques (40% desktop) ─────────────────── */}
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
   <ClickableMap /> — image statique cliquable + overlay info-card
   ───────────────────────────────────────────────────────────────── */

function ClickableMap() {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir l’agence sur Google Maps (nouvel onglet)"
      className="group relative block h-[320px] w-full overflow-hidden rounded-2xl bg-charcoal/40 md:h-[480px]"
    >
      <Image
        src="/photos/map-brest.jpg"
        alt="Carte de localisation de l’agence Visages du Monde Brest"
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        quality={85}
        className="object-cover"
      />
      {/* Voile navy qui s'intensifie au hover — souligne la zone interactive */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-navy/15 transition-colors duration-300 group-hover:bg-navy/30"
      />

      {/* Overlay info-card — bottom-left desktop, plein-bas mobile.
          Volontairement SANS H2 d'adresse (le H2 canonique vit dans
          le panneau infos à droite, pas de doublon).
       */}
      <div className="absolute inset-x-4 bottom-4 max-w-[320px] md:bottom-6 md:left-6 md:right-auto">
        <div className="rounded-2xl bg-cream p-5 text-charcoal shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)] md:p-6">
          <Logo height={24} />
          <p className="mt-4 text-[15px] font-semibold text-charcoal">
            Visages du Monde Brest
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-slate">
            {AGENCE_ADDRESS.street}
            <br />
            {AGENCE_ADDRESS.postalCode} {AGENCE_ADDRESS.city} · Tram Siam
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-petrol transition-colors group-hover:text-petrol-dark">
            Voir sur Google Maps
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}
