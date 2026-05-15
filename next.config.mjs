/** @type {import('next').NextConfig} */

/**
 * Content-Security-Policy.
 *
 * - 'unsafe-inline' + 'unsafe-eval' sur script-src sont requis par Next.js
 *   (runtime, hydration) et Framer Motion. Acceptable ici : site statique,
 *   aucune surface d'input utilisateur, aucun risque de DOM XSS pratique.
 * - À durcir avec nonces dynamiques quand on aura une API route (/api/reviews
 *   pour la Places API, formulaire de contact, etc.).
 * - frame-src whitelist : maps.google.com (iframe carte legacy si on la garde),
 *   user.clicrdv.com (lien externe, pas iframé aujourd'hui mais bon).
 * - frame-ancestors 'none' = anti-clickjacking, en plus de X-Frame-Options DENY.
 */
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://maps.gstatic.com https://*.googleapis.com https://*.google.com;
  frame-src https://maps.google.com https://www.google.com https://user.clicrdv.com;
  connect-src 'self' https://vitals.vercel-insights.com;
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  object-src 'none';
  upgrade-insecure-requests;
`
  .replace(/\s+/g, ' ')
  .trim();

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeader },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            // max-age 2 ans + preload-eligible (préparer un éventuel preload list submit)
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
