import { Facebook, Instagram } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { HORAIRES } from '@/data/horaires';
import {
  AGENCE_ADDRESS,
  AGENCE_PHONE,
  AGENCE_PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from '@/lib/utils';

const SECTIONS = [
  { label: 'Nos univers', href: '#univers' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'L’agence', href: '#agence' },
  { label: 'Avis', href: '#avis' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70">
      <Container className="grid grid-cols-2 gap-12 py-16 lg:grid-cols-4">
        {/* Col 1 — identité */}
        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-[32px] lowercase leading-none tracking-tight text-cream">
            visages du monde
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70">
            Agence de voyages
          </p>
          <p className="mt-6 max-w-[280px] text-[14px] leading-relaxed">
            Agence de voyages indépendante. Brest, à deux pas du tram Siam.
          </p>
        </div>

        {/* Col 2 — sitemap */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream">
            Plan du site
          </p>
          <ul className="mt-5 space-y-3 text-[14px]">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="transition-colors duration-200 hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — contact */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream">
            Contact
          </p>
          <address className="mt-5 space-y-2 text-[14px] not-italic">
            <p>
              {AGENCE_ADDRESS.street}
              <br />
              {AGENCE_ADDRESS.postalCode} {AGENCE_ADDRESS.city}
            </p>
            <p>
              <a
                href={`tel:${AGENCE_PHONE_TEL}`}
                className="transition-colors hover:text-cream"
              >
                {AGENCE_PHONE}
              </a>
            </p>
          </address>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-cream">
            Horaires
          </p>
          <ul className="mt-3 space-y-1 text-[13px]">
            {HORAIRES.filter((h) => !h.ferme).map((h) => (
              <li key={h.label}>
                <span className="text-cream/90">{h.label}</span>{' '}
                <span className="text-cream/60">
                  {h.matin}
                  {h.apresMidi && ` · ${h.apresMidi}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — réseaux */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream">
            Suivez-nous
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Compte Instagram (nouvel onglet)"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 transition-all duration-200 hover:border-petrol hover:bg-petrol hover:text-cream"
            >
              <Instagram size={20} aria-hidden="true" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Page Facebook (nouvel onglet)"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 transition-all duration-200 hover:border-petrol hover:bg-petrol hover:text-cream"
            >
              <Facebook size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col gap-3 py-6 text-[12px] text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Visages du Monde Brest · Mentions légales · Politique de confidentialité
          </p>
          <p>Site conçu par CRUX STUDIO</p>
        </Container>
      </div>
    </footer>
  );
}
