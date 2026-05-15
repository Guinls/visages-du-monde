import { cn } from '@/lib/utils';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'link';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  // Fond cream sur photo ou fond sombre — bouton principal du hero/CTA
  primary:
    'bg-cream text-charcoal hover:bg-white hover:scale-[1.02] hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3)]',
  // Variante "fond pétrole" pour la nav et CTA secondaires sur fond clair
  secondary:
    'bg-petrol text-cream hover:bg-petrol-dark hover:scale-[1.02] hover:shadow-[0_8px_24px_-12px_rgba(20,153,199,0.6)]',
  // Outline sur fond sombre ou photo
  outline:
    'border border-current bg-transparent hover:bg-current/10',
  // Lien inline souligné
  link: 'underline underline-offset-4 decoration-current hover:opacity-70',
};

const SIZES: Record<Size, string> = {
  sm: 'px-5 py-2 text-[13px]',
  md: 'px-6 py-3 text-[14px]',
  lg: 'px-8 py-4 text-[15px]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide ' +
  'transition-all duration-200 ease-out-expo motion-reduce:transition-none ' +
  'motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none';

const linkBase = 'p-0 rounded-none gap-1.5 font-medium';

/**
 * Bouton polyvalent — rend un <a> si `href` est fourni, sinon un <button>.
 * Les variantes link conservent un padding nul et n'utilisent pas le rounded-full.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;

  const classes = cn(
    baseClasses,
    variant === 'link' ? linkBase : SIZES[size],
    VARIANTS[variant],
    className,
  );

  if ('href' in props && props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const isExternal = props.href.startsWith('http') || props.href.startsWith('mailto:');
    return (
      <a
        {...rest}
        className={classes}
        {...(isExternal && { rel: 'noopener noreferrer', target: rest.target ?? '_blank' })}
      >
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
