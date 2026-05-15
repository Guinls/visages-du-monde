import { cn } from '@/lib/utils';
import type { ElementType, ReactNode } from 'react';

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/**
 * Conteneur max-width 1440 avec padding latéral fluide
 * (clamp 16→64px). Sert de gabarit horizontal pour la quasi-totalité
 * des sections.
 */
export function Container({ as: Tag = 'div', children, className }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full max-w-container px-[clamp(16px,4vw,64px)]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
