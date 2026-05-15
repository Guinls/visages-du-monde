import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Petit kicker uppercase letter-spaced qu'on met au-dessus des
 * titres de section. C'est l'élément qui structure visuellement
 * la page sans gueuler.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-[12px] font-mono uppercase tracking-[0.2em] text-slate',
        className,
      )}
    >
      {children}
    </p>
  );
}
