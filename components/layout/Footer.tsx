import { Facebook, Instagram } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { PartnerLabels } from '@/components/ui/PartnerLabels';
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
  { label: 'Inspirations', href: '#inspirations' },
  { label: 'Le réseau', href: '#reseau' },
  { label: 'L’agence', href: '#agence' },
  { label: 'Avis', href: '#avis' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Contact', href: '#contact' },
];

/** Entité juridique exploitante de l'agence. */
const LEGAL_ENTITY = {
  name: 'Coach And Travel Investment',
  address: '196 Rue Ampère, Parc Activité La Tourelle, 22400 Lamballe',
  immatriculation: 'IM031100005',
};

/**
 * Footer en 3 zones distinctes :
 *  1. Identité / sitemap / contact / réseaux (grille 4 cols)
 *  2. Garanties & certifications (bande PartnerLabels)
 *  3. Mentions légales (2 lignes copyright/légal)
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70">
      {/* ─── Zone 1 ────────────────────────────────────────────── */}
      <Container className="grid grid-cols-2 gap-12 py-16 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Logo height={48} />
          <p className="mt-6 max-w-[280px] text-[14px] leading-relaxed">
            Agence de voyages, Brest. Membre du réseau Visages du Monde, depuis 1952.
          </p>
        </div>

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

      {/* ─── Zone 2 — Garanties & certifications ─────────────────── */}
      <div className="border-t border-cream/10 py-8">
        <Container>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
            Garanties &amp; certifications
          </p>
          <div className="mt-6">
            <PartnerLabels height={36} tone="cream" />
          </div>
        </Container>
      </div>

      {/* ─── Zone 3 — Mentions légales ──────────────────────────── */}
      <div className="border-t border-cream/10">
        <Container className="py-4 text-[12px] leading-relaxed text-cream/50">
          <p>
            {LEGAL_ENTITY.name} · {LEGAL_ENTITY.address} · Immatriculation Atout France{' '}
            {LEGAL_ENTITY.immatriculation} · Garantie financière APST · Assurance RCP AXA
            Assurances
          </p>
        </Container>
      </div>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col gap-3 py-4 text-[12px] text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Visages du Monde Brest · Mentions légales · Politique de
            confidentialité · Cookies · Site conçu par CRUX STUDIO
          </p>
        </Container>
      </div>
    </footer>
  );
}
