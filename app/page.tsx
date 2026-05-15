import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import { Agence } from '@/components/sections/Agence';
import { Avis } from '@/components/sections/Avis';
import { CecileEtMarie } from '@/components/sections/CecileEtMarie';
import { Destinations } from '@/components/sections/Destinations';
import { Hero } from '@/components/sections/Hero';
import { Instagram } from '@/components/sections/Instagram';
import { Methode } from '@/components/sections/Methode';
import { Pitch } from '@/components/sections/Pitch';
import { Univers } from '@/components/sections/Univers';
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '@/data/avis';
import { HORAIRES } from '@/data/horaires';
import {
  AGENCE_ADDRESS,
  AGENCE_PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_URL,
} from '@/lib/utils';

/**
 * JSON-LD `TravelAgency` — données structurées pour le SEO local.
 * Documenté ici : https://schema.org/TravelAgency
 *
 * Aucune donnée user-input : tout est dur (constantes + data files).
 * Pas d'échappement nécessaire mais on encode quand même via JSON.stringify
 * pour éviter tout caractère problématique injecté plus tard.
 */
function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#agence`,
    name: 'Visages du Monde Brest',
    alternateName: 'Visages du Monde',
    description:
      'Agence de voyages indépendante à Brest. 85 destinations, des conseillères passionnées, des voyages dessinés sur mesure.',
    url: SITE_URL,
    telephone: AGENCE_PHONE_TEL,
    image: `${SITE_URL}/photos/turquie-mongolfiere.png`,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: AGENCE_ADDRESS.street,
      postalCode: AGENCE_ADDRESS.postalCode,
      addressLocality: AGENCE_ADDRESS.city,
      addressCountry: AGENCE_ADDRESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: AGENCE_ADDRESS.lat,
      longitude: AGENCE_ADDRESS.lng,
    },
    openingHours: HORAIRES.map((h) => h.schema).filter((s) => !s.includes('closed')),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING,
      reviewCount: GOOGLE_REVIEWS_COUNT,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
  };
}

export default function HomePage() {
  const jsonLd = buildJsonLd();

  return (
    <>
      {/* Données structurées (SEO local) — injectées en JSON safe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Nav />

      <main id="main">
        <Hero />
        <Pitch />
        <CecileEtMarie />
        <Univers />
        <Destinations />
        <Methode />
        <Avis />
        <Instagram />
        <Agence />
      </main>

      <Footer />
    </>
  );
}
