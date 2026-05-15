export type Univers = {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const UNIVERS: Univers[] = [
  {
    id: 'sur-mesure',
    badge: 'SUR-MESURE',
    title: 'Votre voyage, dessiné main.',
    description:
      'On part de votre carte blanche : envies, budget, rythme. On compose un itinéraire qui vous ressemble — pas un catalogue.',
    image: '/photos/maisons-europe-du-nord.png',
    alt: 'Maisons colorées de pêcheurs au bord d’un fjord en Europe du Nord',
  },
  {
    id: 'sejours',
    badge: 'SÉJOURS & PLAGES',
    title: 'Le temps d’une parenthèse.',
    description:
      'Sable blanc, lagons turquoise, hôtels choisis pour leur âme. Pour souffler quelques jours, ou un peu plus.',
    image: '/photos/tanzanie.png',
    alt: 'Plage sauvage de Tanzanie au crépuscule',
  },
  {
    id: 'circuits',
    badge: 'CIRCUITS & CULTURES',
    title: 'À la rencontre du monde.',
    description:
      'Inde, Japon, Égypte, Maroc, Mexique… Des itinéraires guidés ou en liberté, pour aller à la rencontre des cultures et des paysages.',
    image: '/photos/visage-inde.png',
    alt: 'Portrait d’un homme en Inde, regard intense',
  },
  {
    id: 'aventures',
    badge: 'AVENTURES & PASSIONS',
    title: 'Safaris, croisières, sommets.',
    description:
      'Aurores boréales en Laponie, safari en Tanzanie, croisière sur le Rhin, trek en Patagonie : les voyages qu’on rêve une fois dans sa vie.',
    image: '/photos/aurores-boreales.png',
    alt: 'Aurores boréales vertes au-dessus d’un paysage enneigé',
  },
];
