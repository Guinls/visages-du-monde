# Visages du Monde — Brest

Site éditorial de l'agence de voyages **Visages du Monde Brest** (44 rue Emile Zola, 29200 Brest).

Stack : **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · next/image · next/font**.

---

## 🚀 Lancer le projet en local

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

Pour un build de production :

```bash
npm run build
npm run start
```

---

## 📁 Arborescence

```
/app                  → routes Next (App Router), métadonnées, JSON-LD
/components
  /layout             → IntroLoader, Nav, Footer
  /sections           → toutes les sections de la home (Hero, Pitch, …)
  /ui                 → primitives (Button, Container, Eyebrow, SectionReveal)
/data                 → contenus typés (destinations, avis, horaires, univers)
/lib                  → helpers (utils.ts → cn, constantes globales)
/public
  /photos             → 36 photos de l'agence (kebab-case .png)
  logo.svg            → logo officiel
```

---

## 🖼️ Photos

Toutes les photos sont stockées dans `/public/photos/` en **kebab-case** (`.png`).
Pour ajouter ou remplacer une photo :

1. Pose le fichier `.png` ou `.jpg` dans `/public/photos/` (nom kebab-case, pas d'espaces).
2. Référence-la dans le fichier `/data/` adéquat avec son chemin absolu (`/photos/ma-photo.png`) et un `alt` descriptif.

Les `alt` doivent rester précis (WCAG AA) : ce qu'on voit, dans quel contexte.

---

## ✏️ Modifier les contenus

Tous les textes sont en français dans `/data/*.ts` :

| Fichier                | Contenu                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `data/univers.ts`      | Les 4 univers de voyage (cartes 2×2 — section "Vos prochains horizons") |
| `data/destinations.ts` | Les 4 offres du moment (slider horizontal — section "En ce moment") |
| `data/avis.ts`         | Témoignages Google (+ note + nombre d'avis pour le JSON-LD)      |
| `data/horaires.ts`     | Horaires d'ouverture (au format affichage + Schema.org)          |

Les textes plus structurels (titres de sections, microcopy, méthode en 4 étapes) sont
dans les composants de section eux-mêmes (`/components/sections/*.tsx`) — c'est volontaire,
parce qu'ils sont fortement couplés au design.

---

## ☎️ Changer le numéro de téléphone

Le numéro est centralisé dans `lib/utils.ts` (constante `AGENCE_PHONE`), avec une valeur
par défaut "+33 2 XX XX XX XX". Pour le mettre à jour :

**Option A — variable d'environnement (recommandé pour la prod) :**

Copie `.env.example` en `.env.local` puis remplis :

```bash
NEXT_PUBLIC_AGENCE_PHONE=+33298XXXXXX
```

**Option B — édition directe :**

Modifie la constante `AGENCE_PHONE` dans [`lib/utils.ts`](lib/utils.ts).

Le numéro est utilisé à 3 endroits : Hero CTA "Nous appeler", section "Agence" (gros affichage) et Footer.

---

## 🎨 Design system

Couleurs (Tailwind config) :

| Token       | HEX      | Usage                             |
| ----------- | -------- | --------------------------------- |
| `petrol`    | #1499C7  | Couleur signature (logo, accents) |
| `petrol-dark` | #0F7CA3 | Hover du petrol                   |
| `navy`      | #0A3B5C  | Bleu profond (chiffres, footer Contact) |
| `cream`     | #FAF7F2  | Fond principal                    |
| `bone`      | #F0EBE0  | Fond secondaire (sections alternées) |
| `charcoal`  | #1A1A1A  | Texte principal                   |
| `slate`     | #4A4A4A  | Texte secondaire                  |
| `terracotta` | #C4633E | Accent chaud (étoiles, tags promo) |

Polices :

| Famille       | Google Font   | Utilisée pour                                 |
| ------------- | ------------- | --------------------------------------------- |
| `font-display` | Anton         | Titres hero, H2 de sections (uppercase bold)  |
| `font-body`    | Inter         | Corps de texte, H3, paragraphes               |
| `font-mono`    | JetBrains Mono | Chiffres clés, eyebrows, labels uppercase     |

---

## 🎬 Intro animation

Le composant `<IntroLoader />` joue une animation de 2.4s à la première visite de la session
(globe wireframe + avion en orbite + logo + microcopy). Le flag `vdm-intro-seen` est posé
dans `sessionStorage`.

- Skip automatique si `prefers-reduced-motion: reduce`.
- Pour le rejouer en dev : ouvre la console et fais `sessionStorage.clear()`.

---

## ♿ Accessibilité

- Skip-link "Aller au contenu" en haut de page (visible au focus).
- Contraste WCAG AA vérifié sur l'ensemble de la charte.
- `alt` descriptif sur toutes les images.
- Focus visible (outline pétrole 2px).
- Slider hero avec dots cliquables, `aria-live` polite.
- `prefers-reduced-motion` respecté partout (transitions désactivées).

---

## 🔍 SEO

- Métadonnées + OpenGraph dans `app/layout.tsx`.
- JSON-LD `TravelAgency` injecté dans `app/page.tsx` (adresse, géo, horaires, note Google, réseaux).
- `app/robots.ts` + `app/sitemap.ts` auto-générés par Next.
- Images en WebP/AVIF via `next/image`.

---

## 🛡️ Sécurité

- Aucune clé secrète dans le code (cf. `.env.example`).
- Headers sécurité par défaut dans `next.config.mjs` (HSTS, X-Frame-Options, nosniff, Permissions-Policy).
- Tous les liens externes : `rel="noopener noreferrer"`.
- Pas de `dangerouslySetInnerHTML` sur du contenu utilisateur (uniquement sur le JSON-LD, qui est généré côté serveur à partir de constantes).

---

## 📦 Déploiement

Pensé pour Vercel par défaut (zéro config). Pour un autre provider, assure-toi que :

- Node ≥ 18.17
- `next build` produit bien le `.next/`
- Les variables d'env publiques sont définies au build (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_AGENCE_PHONE`, `NEXT_PUBLIC_CLICRDV_URL`).

---

© 2026 Visages du Monde Brest — Site conçu par CRUX STUDIO.
