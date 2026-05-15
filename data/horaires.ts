export type Horaire = {
  label: string;
  schema: string; // Au format Schema.org openingHours (Mo, Tu, We, Th, Fr, Sa, Su)
  matin: string;
  apresMidi: string;
  ferme?: boolean;
};

export const HORAIRES: Horaire[] = [
  {
    label: 'Lundi → Jeudi',
    schema: 'Mo-Th 10:00-12:30,13:30-18:30',
    matin: '10h — 12h30',
    apresMidi: '13h30 — 18h30',
  },
  {
    label: 'Vendredi',
    schema: 'Fr 10:00-12:30,13:30-18:00',
    matin: '10h — 12h30',
    apresMidi: '13h30 — 18h',
  },
  {
    label: 'Samedi',
    schema: 'Sa 10:00-12:30,13:30-17:00',
    matin: '10h — 12h30',
    apresMidi: '13h30 — 17h',
  },
  {
    label: 'Dimanche',
    schema: 'Su closed',
    matin: 'Fermé',
    apresMidi: '',
    ferme: true,
  },
];
