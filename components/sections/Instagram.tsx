import { Instagram as InstagramIcon } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { INSTAGRAM_URL } from '@/lib/utils';

// 12 vignettes — sélection éditoriale parmi les 36 photos
const GRID: Array<{ src: string; alt: string }> = [
  { src: '/photos/lynx.png', alt: 'Lynx dans la neige, regard intense' },
  { src: '/photos/koala.png', alt: 'Koala accroché à une branche d’eucalyptus' },
  { src: '/photos/temple.png', alt: 'Temple bouddhiste asiatique au crépuscule' },
  { src: '/photos/japon.png', alt: 'Temple japonais sous les cerisiers en fleurs' },
  { src: '/photos/maroc.png', alt: 'Ruelle d’une médina marocaine baignée de couleurs' },
  { src: '/photos/egypte.png', alt: 'Site archéologique égyptien dans le désert' },
  { src: '/photos/statue-asie.png', alt: 'Statue ancienne en pierre, Asie' },
  { src: '/photos/corcovado.png', alt: 'Christ Rédempteur du Corcovado à Rio de Janeiro' },
  { src: '/photos/thailande.png', alt: 'Plage de Thaïlande aux eaux turquoise' },
  { src: '/photos/loutres-de-mer.png', alt: 'Loutres de mer flottant sur le dos' },
  { src: '/photos/chiens-de-traineaux.png', alt: 'Attelage de chiens de traîneau sur la banquise' },
  { src: '/photos/tortue.png', alt: 'Tortue de mer dans des eaux turquoise' },
];

export function Instagram() {
  return (
    <section
      id="instagram"
      className="bg-cream py-24 md:py-32"
      aria-label="Notre compte Instagram"
    >
      <Container>
        <SectionReveal className="max-w-3xl">
          <Eyebrow>Instagram</Eyebrow>
          <h2 className="mt-4 font-display text-display-1 uppercase text-charcoal">
            Suivez nos voyages.
          </h2>
          <p className="mt-5 font-mono text-[14px] text-slate">@visagesdumondevoyages</p>
        </SectionReveal>

        <ul className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-charcoal/10 md:grid-cols-6">
          {GRID.map((img, i) => (
            <li key={img.src + i}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Voir le compte Instagram (${img.alt})`}
                className="group relative block aspect-square overflow-hidden bg-cream"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                {/* Overlay petrol au hover + icône Insta */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-petrol/0 transition-colors duration-300 group-hover:bg-petrol/40"
                >
                  <InstagramIcon
                    size={28}
                    className="text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <SectionReveal className="mt-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-[14px] font-medium text-navy transition-all duration-200 hover:bg-navy hover:text-cream"
          >
            <InstagramIcon size={16} aria-hidden="true" />
            Voir le compte Instagram
          </a>
        </SectionReveal>
      </Container>
    </section>
  );
}
