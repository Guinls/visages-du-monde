import type { Metadata, Viewport } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { IntroLoader } from '@/components/layout/IntroLoader';
import { SITE_URL } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Fonts — chargées via next/font (display: swap, preload).
   On expose chaque famille en CSS variable utilisée dans tailwind.config.
   ───────────────────────────────────────────── */
const displayFont = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

/* ─────────────────────────────────────────────
   Métadonnées globales
   ───────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Visages du Monde Brest — Agence de voyages depuis 1952',
    template: '%s · Visages du Monde Brest',
  },
  description:
    'Agence de voyages à Brest, membre du réseau Visages du Monde. 85 destinations, conseillères passionnées, voyages sur mesure. RDV au 44 rue Emile Zola.',
  applicationName: 'Visages du Monde Brest',
  authors: [{ name: 'Visages du Monde Brest' }],
  keywords: [
    'agence de voyages Brest',
    'Visages du Monde',
    'voyage sur mesure',
    'circuits',
    'séjours',
    'croisières',
    'voyage de noces',
    'safari',
    'Selectour',
    'Finistère',
    'Bretagne',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'Visages du Monde Brest',
    title: 'Visages du Monde Brest — Agence de voyages depuis 1952',
    description:
      'Agence de voyages à Brest, membre du réseau Visages du Monde (42 agences en France). Voyages sur mesure conçus par une équipe locale.',
    images: [
      {
        url: '/photos/turquie.jpg',
        width: 1200,
        height: 630,
        alt: 'Montgolfières au lever du soleil, Turquie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visages du Monde Brest — Agence de voyages depuis 1952',
    description:
      'Agence de voyages à Brest, membre du réseau Visages du Monde. Voyages sur mesure.',
    images: ['/photos/turquie.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  // Next.js auto-découvre /app/icon.png et /app/apple-icon.png et émet
  // les <link rel="icon"> appropriés. On les explicite ici pour la
  // lisibilité (le bloc metadata reste la source de vérité).
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-cream font-body text-charcoal antialiased">
        {/* Skip-link a11y — visible au focus uniquement */}
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>

        {/* Intro animation : 2.4s, joué une seule fois par session */}
        <IntroLoader />

        {children}
      </body>
    </html>
  );
}
