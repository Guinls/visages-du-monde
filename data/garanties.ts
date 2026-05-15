export type Garantie = {
  id: string;
  /** Nom du label / engagement. */
  title: string;
  /** Sous-titre d'une ligne, sobre. */
  description: string;
  /** Nom de l'icône lucide-react à utiliser. */
  icon:
    | 'network'
    | 'badgeCheck'
    | 'shieldCheck'
    | 'fileCheck'
    | 'building'
    | 'wallet';
};

/**
 * Garanties & engagements affichés sur fond navy.
 * Volontairement sans logos officiels (RGPD / copyright) — uniquement
 * des icônes minimalistes et le texte officiel.
 */
export const GARANTIES: Garantie[] = [
  {
    id: 'selectour',
    title: 'Réseau Selectour',
    description: 'Membre du 1er réseau d’agences indépendantes en France.',
    icon: 'network',
  },
  {
    id: 'atout-france',
    title: 'Atout France',
    description: 'Immatriculation IM031100005.',
    icon: 'badgeCheck',
  },
  {
    id: 'apst',
    title: 'Garantie APST',
    description: 'Protection financière des fonds versés.',
    icon: 'shieldCheck',
  },
  {
    id: 'rcp',
    title: 'Assurance RCP AXA',
    description: 'Responsabilité civile professionnelle.',
    icon: 'fileCheck',
  },
  {
    id: 'reseau-fr',
    title: '42 agences en France',
    description: 'Un réseau national depuis 1952.',
    icon: 'building',
  },
  {
    id: 'paiement',
    title: 'Paiement flexible',
    description: 'CB · 4× sans frais · Chèques vacances.',
    icon: 'wallet',
  },
];
