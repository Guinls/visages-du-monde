'use client';

import { Calendar, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { CLICRDV_URL, cn } from '@/lib/utils';

const LINKS = [
  { label: 'Nos univers', href: '#univers' },
  { label: 'Inspirations', href: '#inspirations' },
  { label: 'Le réseau', href: '#reseau' },
  { label: 'L’agence', href: '#agence' },
  { label: 'Avis', href: '#avis' },
];

/**
 * Navigation sticky.
 * - Au-delà de 80px de scroll : fond cream/85 + backdrop-blur + bordure bas.
 * - Logo : variante "dark" (cream sur photo) en haut de hero, "light" (petrol)
 *   une fois scrollé sur fond cream.
 * - Mobile : burger → panneau plein écran avec mêmes liens en grand.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out',
          scrolled
            ? 'bg-cream/85 backdrop-blur-md border-b border-charcoal/10'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <Container className="flex h-[72px] items-center justify-between">
          {/* Logo gauche — PNG officiel, identique sur hero et fond cream */}
          <a
            href="#top"
            aria-label="Visages du Monde Brest — retour en haut"
            className="inline-flex shrink-0 items-center"
          >
            <Logo height={52} className="hidden md:block" priority />
            <Logo height={40} className="md:hidden" priority />
          </a>

          {/* Liens centre — desktop */}
          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    'text-[14px] font-medium transition-colors duration-200',
                    scrolled
                      ? 'text-charcoal hover:text-petrol'
                      : 'text-cream/90 hover:text-cream',
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA droite — desktop */}
          <div className="hidden lg:block">
            <Button
              variant="secondary"
              size="sm"
              href={CLICRDV_URL}
              aria-label="Prendre rendez-vous avec l’agence (nouvel onglet)"
            >
              Prendre RDV
              <Calendar size={16} aria-hidden="true" />
            </Button>
          </div>

          {/* Burger — mobile */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden',
              scrolled
                ? 'text-charcoal hover:bg-charcoal/5'
                : 'text-cream hover:bg-cream/10',
            )}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </Container>
      </header>

      {/* Panneau mobile plein écran */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <Container className="flex h-[72px] items-center justify-between">
            <Logo height={32} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </Container>

          <Container className="flex flex-1 flex-col justify-center gap-10 pb-24">
            <ul className="flex flex-col gap-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-[44px] lowercase leading-none tracking-tight text-charcoal hover:text-petrol"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <Button
              variant="secondary"
              size="lg"
              href={CLICRDV_URL}
              className="w-full justify-center"
            >
              Prendre rendez-vous
              <Calendar size={18} aria-hidden="true" />
            </Button>
          </Container>
        </div>
      )}
    </>
  );
}
