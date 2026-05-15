import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import { Agence } from '@/components/sections/Agence';
import { Avis } from '@/components/sections/Avis';
import { Confiance } from '@/components/sections/Confiance';
import { Equipe } from '@/components/sections/Equipe';
import { Hero } from '@/components/sections/Hero';
import { Inspirations } from '@/components/sections/Inspirations';
import { Instagram } from '@/components/sections/Instagram';
import { Methode } from '@/components/sections/Methode';
import { Pitch } from '@/components/sections/Pitch';
import { Reseau } from '@/components/sections/Reseau';
import { Univers } from '@/components/sections/Univers';
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '@/data/avis';
import { HORAIRES } from '@/data/horaires';
import { VDM_NATIONAL_URL, VDM_NETWORK } from '@/data/reseau';
import {
  AGENCE_ADDRESS,
  AGENCE_PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_URL,
} from '@/lib/utils';

/**
 * JSON-LD `TravelAgency` — données structurées pour le SEO local.
 * https://schema.org/TravelAgency
 *
 * - Aucune donnée user-input : tout est dur (constantes + data files).
 * - `parentOrganization` rattache l'agence brestoise au réseau national.
 * - `foundingDate` à 1952 = date de fondation du réseau VDM.
 * - `openingHours` filtré des entrées "closed" (Schema.org liste les jours ouverts).
 */
function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#agence`,
    name: 'Visages du Monde Brest',
    alternateName: 'VDM Brest',
    description:
      'Agence de voyages à Brest, membre du réseau Visages du Monde. Voyages sur mesure conçus par une équipe locale.',
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
    parentOrganization: {
      '@type': 'Organization',
      name: 'Visages du Monde',
      url: VDM_NATIONAL_URL,
      foundingDate: String(VDM_NETWORK.anneeFondation),
      description: `Réseau national de ${VDM_NETWORK.agencesFrance} agences de voyages indépendantes en France.`,
    },
  };
}

export default function HomePage() {
  const jsonLd = buildJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Nav />

      <main id="main">
        <Hero />
        <Pitch />
        <Equipe />
        <Univers />
        <Inspirations />
        <Methode />
        <Confiance />
        <Reseau />
        <Avis />
        <Instagram />
        <Agence />
      </main>

      <Footer />
    </>
  );
}
