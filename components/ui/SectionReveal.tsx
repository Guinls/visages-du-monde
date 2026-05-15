'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage initial en pixels avant l'animation (par défaut 20). */
  y?: number;
  /** Délai avant déclenchement (ms équivalents en secondes). */
  delay?: number;
};

/**
 * Wrapper qui anime ses enfants au moment où ils entrent dans le viewport :
 * fade-in + léger translateY. L'animation se joue UNE SEULE FOIS.
 * Respecte `prefers-reduced-motion` (pas de transform, pas de fade).
 */
export function SectionReveal({
  children,
  className,
  y = 20,
  delay = 0,
}: SectionRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
