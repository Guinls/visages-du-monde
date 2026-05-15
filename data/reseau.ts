/**
 * Réseau Visages du Monde en Bretagne — 9 agences.
 * Liste exhaustive pour la section "Le réseau" (point d'ancrage local).
 */
export const RESEAU_BRETAGNE: string[] = [
  'Brest',
  'Concarneau',
  'Guingamp',
  'Lamballe',
  'Morlaix',
  'Quimper',
  'Rennes',
  'Saint-Brieuc',
  'Saint-Pol-de-Léon',
];

/** Site du réseau national. */
export const VDM_NATIONAL_URL = 'https://www.visagesdumonde.fr';

/** Chiffres réseau réutilisables (section et JSON-LD). */
export const VDM_NETWORK = {
  agencesFrance: 42,
  agencesBretagne: 9,
  anneeFondation: 1952,
} as const;
