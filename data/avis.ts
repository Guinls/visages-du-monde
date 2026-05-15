export type Avis = {
  id: string;
  author: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
};

export const AVIS: Avis[] = [
  {
    id: 'florence',
    author: 'Florence Le Cren Perrot',
    date: 'Mars 2026',
    rating: 5,
    quote:
      'Magnifique séjour à Venise. Organisation au top et aux petits soins ! Je recommande Visages du Monde +++',
  },
  {
    id: 'christian',
    author: 'Christian Habasque',
    date: 'Février 2026',
    rating: 5,
    quote:
      'Je remercie Céline pour son professionnalisme et sa gentillesse. Elle a résolu mon problème ETA Kenya Airways malgré mon stress, encore merci !',
  },
  {
    id: 'thierry',
    author: 'Thierry Le Guen',
    date: 'Janvier 2026',
    rating: 5,
    quote: 'Très professionnel du début à la fin de notre séjour aux USA.',
  },
];

export const GOOGLE_RATING = 4.6;
export const GOOGLE_REVIEWS_COUNT = 11;
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Visages+du+Monde+Brest';
