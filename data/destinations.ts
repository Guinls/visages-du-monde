export type Destination = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  until?: string;
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'pouilles',
    tag: 'DÉCOUVERTE / 6 JOURS',
    title: 'Pouilles',
    description:
      'Talon de la botte italienne, vols directs depuis Rennes. Trulli d’Alberobello, mer turquoise, vignobles et tables paysannes.',
    image: '/photos/sicille.png',
    alt: 'Côte rocheuse des Pouilles avec maisons blanches dominant la mer',
    until: 'Jusqu’au 30/06',
  },
  {
    id: 'jeunes',
    tag: '4-17 ANS / COLONIES & LANGUES',
    title: 'Voyages Jeunes',
    description:
      'Action Séjours : colonies, stages sportifs et séjours linguistiques pour les 4-17 ans, encadrés et tout compris.',
    image: '/photos/ski.png',
    alt: 'Jeunes skieurs sur une piste enneigée au lever du soleil',
    until: 'Été 2026',
  },
  {
    id: 'solea',
    tag: '-100€ / PERSONNE',
    title: 'Caraïbes & Océan Indien',
    description:
      'Offre Solea : remise immédiate sur une sélection de séjours plage 7 nuits, départs de Paris et province.',
    image: '/photos/tortue.png',
    alt: 'Tortue de mer nageant dans des eaux turquoise',
    until: 'Jusqu’au 15/07',
  },
  {
    id: 'rhin',
    tag: '475€ / PERSONNE',
    title: 'Croisière sur le Rhin',
    description:
      'Strasbourg, Heidelberg, Cologne, Amsterdam. 5 jours au fil de l’eau, pension complète à bord, escales guidées.',
    image: '/photos/maisons-europe-du-nord.png',
    alt: 'Maisons à pignons typiques d’une ville du nord de l’Europe',
    until: 'Départs printemps',
  },
];
