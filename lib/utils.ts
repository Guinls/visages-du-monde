/**
 * Helper de concaténation conditionnelle de classes Tailwind.
 * Volontairement minimaliste : pas de dépendance (clsx / tailwind-merge)
 * pour garder le bundle lean. Si deux classes Tailwind se chevauchent,
 * l'ordre d'appel fait foi — il suffit de mettre l'override en dernier.
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}

/** URL Clic RDV (réservation) — surchargeable via NEXT_PUBLIC_CLICRDV_URL. */
export const CLICRDV_URL =
  process.env.NEXT_PUBLIC_CLICRDV_URL ?? 'https://user.clicrdv.com/vdm-brest';

/** Téléphone affiché. Placeholder en attendant le vrai numéro. */
export const AGENCE_PHONE = process.env.NEXT_PUBLIC_AGENCE_PHONE ?? '+33 2 XX XX XX XX';

/** Version "tel:" — on retire les espaces non-significatifs. */
export const AGENCE_PHONE_TEL = AGENCE_PHONE.replace(/\s/g, '');

/** URL canonique du site (utilisée pour les métadonnées). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.visagesdumonde-brest.fr';

/** Réseaux sociaux. */
export const INSTAGRAM_URL = 'https://www.instagram.com/visagesdumondevoyages/';
export const FACEBOOK_URL = 'https://www.facebook.com/visagesdumondevoyage';

/** Adresse physique (utilisée dans le footer, JSON-LD, etc.) */
export const AGENCE_ADDRESS = {
  street: '44 rue Emile Zola',
  postalCode: '29200',
  city: 'Brest',
  country: 'FR',
  lat: 48.3870337,
  lng: -4.4882999,
} as const;
