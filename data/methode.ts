export type MethodeStep = {
  num: string;
  /** Nom de l'icône lucide-react (clé du map ICON_MAP dans Methode.tsx). */
  icon: 'messageCircle' | 'compass' | 'shieldCheck' | 'plane';
  title: string;
  description: string;
};

/**
 * Les 4 temps de notre méthode — section "Comment nous travaillons".
 * Volontairement courts (3 lignes max par description).
 */
export const METHODE: MethodeStep[] = [
  {
    num: '01',
    icon: 'messageCircle',
    title: 'Rencontre',
    description:
      'En agence, par téléphone ou en visio. On écoute vos envies, votre budget, vos contraintes.',
  },
  {
    num: '02',
    icon: 'compass',
    title: 'Conception',
    description:
      'On dessine plusieurs propositions sur mesure, on ajuste jusqu’à ce que ça vous parle.',
  },
  {
    num: '03',
    icon: 'shieldCheck',
    title: 'Réservation',
    description:
      'Tout est sécurisé : vols, hôtels, prestations, assurances. Vous n’avez plus qu’à préparer votre valise.',
  },
  {
    num: '04',
    icon: 'plane',
    title: 'Accompagnement',
    description:
      'Avant, pendant, après. Un imprévu en voyage ? On est joignables.',
  },
];
