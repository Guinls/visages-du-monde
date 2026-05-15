export type Inspiration = {
  id: string;
  /** Tag uppercase terracotta (univers / format). PAS de prix : ce n'est pas un site marchand. */
  tag: string;
  /** Destination (display, uppercase). */
  title: string;
  /** 2 lignes max — donner envie, ne pas vendre. */
  description: string;
  image: string;
  alt: string;
};

/**
 * Inspirations du moment — sélection saisonnière, mise à jour ~mensuellement.
 * Aucun prix affiché : les détails se découvrent en agence.
 */
export const INSPIRATIONS: Inspiration[] = [
  {
    id: 'pouilles',
    tag: 'DÉCOUVERTE · ITALIE',
    title: 'Pouilles',
    description:
      'Talon de la botte italienne, vols directs depuis Rennes. Trulli d’Alberobello, mer turquoise, vignobles et tables paysannes.',
    image: '/photos/sicille.png',
    alt: 'Côte rocheuse des Pouilles avec maisons blanches dominant la mer',
  },
  {
    id: 'jeunes',
    tag: 'VOYAGES JEUNES · 4-17 ANS',
    title: 'Colonies & langues',
    description:
      'Colonies, stages sportifs et séjours linguistiques pour les 4-17 ans, encadrés et tout compris.',
    image: '/photos/ski.png',
    alt: 'Jeunes skieurs sur une piste enneigée au lever du soleil',
  },
  {
    id: 'solea',
    tag: 'CARAÏBES & OCÉAN INDIEN',
    title: 'Soleil d’été',
    description:
      'Sélection de séjours plage 7 nuits, départs de Paris et province. À découvrir avec votre conseiller.',
    image: '/photos/tortue.png',
    alt: 'Tortue de mer nageant dans des eaux turquoise',
  },
  {
    id: 'rhin',
    tag: 'CROISIÈRE · EUROPE DU NORD',
    title: 'Au fil du Rhin',
    description:
      'Strasbourg, Heidelberg, Cologne, Amsterdam. 8 jours au fil de l’eau, pension complète à bord, escales guidées.',
    image: '/photos/moulin.png',
    alt: 'Moulin à vent au cœur d’un paysage rural néerlandais',
  },
];
