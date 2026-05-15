export type Avis = {
  id: string;
  author: string;
  /** Format ISO YYYY-MM-DD pour le JSON-LD ; reformaté à l'affichage. */
  date: string;
  /** Format affiché à l'utilisateur (FR : JJ/MM/AAAA). */
  dateLabel: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /**
   * Citation littérale laissée par le client sur Google.
   * NB : les avis sont des paroles de clients — ils peuvent mentionner un
   * prénom de conseillère. Ce ne sont pas du rédactionnel produit par
   * l'agence, donc la règle d'anonymisation ne s'y applique pas.
   */
  quote: string;
};

export const AVIS: Avis[] = [
  {
    id: 'florence',
    author: 'Florence Le Cren Perrot',
    date: '2023-01-19',
    dateLabel: '19/01/2023',
    rating: 5,
    quote:
      'Magnifique séjour à Venise. Organisation au top et aux petits soins ! Je recommande Visages du Monde +++',
  },
  {
    id: 'christian',
    author: 'Christian Habasque',
    date: '2024-11-05',
    dateLabel: '05/11/2024',
    rating: 5,
    quote:
      'Je remercie Céline pour son professionnalisme et sa gentillesse. Elle a résolu mon problème ETA Kenya Airways malgré mon stress, encore merci !',
  },
  {
    id: 'thierry',
    author: 'Thierry Le Guen',
    date: '2025-02-28',
    dateLabel: '28/02/2025',
    rating: 5,
    quote: 'Très professionnel du début à la fin de notre séjour aux USA.',
  },
];

export const GOOGLE_RATING = 4.6;
export const GOOGLE_REVIEWS_COUNT = 11;
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Visages+du+Monde+Brest/@48.3870337,-4.4882999,17z';
/** Place ID Google Brest — pour la future intégration Places API (cf. README). */
export const GOOGLE_PLACE_ID = 'ChIJabmJklm5FkgRvJ0b40JNsrY';
