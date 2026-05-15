# Visages du Monde — Brest

Site éditorial vitrine de l'agence **Visages du Monde Brest** (44 rue Emile Zola, 29200 Brest), membre du réseau national Visages du Monde (42 agences en France, depuis 1952).

**Positionnement** : vitrine locale, pas un site marchand. Donne envie de pousser la porte et redirige vers le central pour les réservations.

Stack : **Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · next/image · next/font**.

---

## 🚀 Lancer le projet

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de prod
npm run start        # serveur de prod local
```

---

## 📁 Arborescence

```
/app                  → routes Next, metadata, JSON-LD, robots, sitemap
/components
  /layout             → IntroLoader, Nav, Footer
  /sections           → Hero, Pitch, Equipe, Univers, Inspirations,
                        Methode, Confiance, Reseau, Avis, Instagram, Agence
  /ui                 → Button, Container, Eyebrow, Logo, SectionReveal
/data                 → univers, inspirations, avis, horaires,
                        garanties, reseau
/lib                  → utils (cn, constantes globales)
/public
  /photos             → toutes les photos (kebab-case .png)
  logo.svg            → ⚠️ logo TEMPORAIRE (typo recréée)
                        à remplacer par /public/logo.png officiel
```

---

## ⚠️ Logo — à fournir par Guillaume

Le fichier `/public/logo.png` (logo officiel du réseau Visages du Monde, fond transparent, ≥ 200px de haut) **n'est pas encore en place**. Le site sert actuellement le fichier de secours `/public/logo.svg` (typo recréée, **non conforme à la charte officielle**).

**Pour basculer sur le vrai logo** :

1. Poser `logo.png` dans `/public/`
2. Dans [`components/ui/Logo.tsx`](components/ui/Logo.tsx) :
   - Remplacer `const SRC = '/logo.svg'` par `const SRC = '/logo.png'`
   - Ajuster la constante `RATIO` (largeur intrinsèque / hauteur intrinsèque du PNG)
3. C'est tout — le composant `<Logo />` est utilisé partout (Nav, Footer, IntroLoader), un seul changement propage.

Le composant gère automatiquement deux variantes via une prop :
- `variant="light"` → couleur native (bleu pétrole) sur fonds clairs
- `variant="dark"` → filtre CSS qui blanchit le logo pour fonds sombres / photos

---

## 🖼️ Photos

Toutes les photos vivent dans `/public/photos/` en **kebab-case** (`.png`).

**Résolutions cibles** :
- Hero : min 2400px sur le côté le plus long (idéal 3200-4000px)
- Cartes univers / inspirations : min 1600px
- Mosaïque Instagram : min 800px

**À chaque ajout / remplacement** :

1. Pose le fichier en kebab-case dans `/public/photos/`
2. Référence-le dans le `/data/` adéquat avec un `alt` descriptif (ce qu'on voit, dans quel contexte)

`next/image` convertit automatiquement en WebP/AVIF, quality 85 par défaut, blur placeholder géré par Next.

---

## ✏️ Contenus

Tous les textes éditoriaux sont en français dans `/data/*.ts` :

| Fichier                 | Contenu                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `data/univers.ts`       | Les 4 univers de voyage (section "Vos prochains horizons")       |
| `data/inspirations.ts`  | Les 4 inspirations du moment (slider — **sans prix**)            |
| `data/avis.ts`          | Témoignages Google (+ note + nombre d'avis pour le JSON-LD)      |
| `data/horaires.ts`      | Horaires (format affichage + Schema.org)                         |
| `data/garanties.ts`     | Garanties officielles (Atout France, APST, Selectour, RCP AXA…)  |
| `data/reseau.ts`        | Liste des agences VDM en Bretagne + chiffres réseau              |

Les titres et microcopy des sections sont dans les composants eux-mêmes — couplés au design, plus simple à éditer en contexte.

### Règles éditoriales V2

- **Équipe anonymisée** : ne pas nommer Cécile / Marie dans le corps du site. Toujours dire "l'équipe", "nos conseillères passionnées".
- **Pas un site marchand** : ne jamais afficher de prix en gros. Les détails se découvrent en agence.
- **Local + réseau** : valoriser à la fois l'agence brestoise ET le réseau national de 42 agences depuis 1952.

---

## ☎️ Téléphone (placeholder)

Centralisé dans [`lib/utils.ts`](lib/utils.ts) (`AGENCE_PHONE`), placeholder `+33 2 XX XX XX XX` actuellement.

**Pour le remplacer** (deux options) :

```bash
# Option A — env (recommandé prod)
cp .env.example .env.local
# puis remplir NEXT_PUBLIC_AGENCE_PHONE=+33298XXXXXX
```

Ou directement dans `lib/utils.ts` (constante `AGENCE_PHONE`).

Utilisé à 3 endroits : Hero CTA, section Agence (gros affichage), Footer.

---

## 👥 Équipe — quand la carte d'équipe arrivera

La section [`Equipe.tsx`](components/sections/Equipe.tsx) accueillera une carte d'équipe sobre quand le shooting sera fait :
- Photo (carré 1:1 ou portrait 3:4)
- **Prénom seul**
- Spécialité (1 ligne)

C'est commenté dans le composant pour s'y retrouver le moment venu.

---

## 🎨 Design system

Couleurs (Tailwind) :

| Token       | HEX      | Usage                             |
| ----------- | -------- | --------------------------------- |
| `petrol`    | #1499C7  | Couleur signature (logo, accents) |
| `petrol-dark` | #0F7CA3 | Hover du petrol                   |
| `navy`      | #0A3B5C  | Bleu profond (Confiance, Agence, chiffres) |
| `cream`     | #FAF7F2  | Fond principal                    |
| `bone`      | #F0EBE0  | Fond secondaire (sections alternées) |
| `charcoal`  | #1A1A1A  | Texte principal / footer          |
| `slate`     | #4A4A4A  | Texte secondaire                  |
| `terracotta` | #C4633E | Accent chaud (étoiles, tags)      |

Polices (next/font) : **Anton** (display), **Inter** (body + headings), **JetBrains Mono** (chiffres, eyebrows).

---

## 🎬 Intro animation

Le composant `<IntroLoader />` joue 2.4s à la première visite (globe wireframe + avion en orbite + logo + microcopy).

- Flag `vdm-intro-seen` dans `sessionStorage`
- Skip si `prefers-reduced-motion: reduce`
- Pour le rejouer en dev : `sessionStorage.clear()` puis reload

---

## ♿ Accessibilité (WCAG 2.1 AA)

- Skip-link "Aller au contenu" en haut de page (visible au focus)
- Contraste vérifié sur toute la charte
- `alt` descriptif sur toutes les images
- Focus visible (outline pétrole 2px)
- Slider hero `aria-live` polite, dots cliquables
- `prefers-reduced-motion` respecté partout

---

## 🔍 SEO

- Title : "Visages du Monde Brest — Agence de voyages depuis 1952"
- Description + OpenGraph + Twitter card dans `app/layout.tsx`
- JSON-LD `TravelAgency` avec **`parentOrganization`** (réseau VDM) dans `app/page.tsx`
- `robots.ts` + `sitemap.ts` auto-générés
- Images WebP/AVIF via `next/image` (quality 85)

---

## 🛡️ Sécurité

- Aucun secret en dur (cf. `.env.example`)
- Headers sécurité par défaut dans `next.config.mjs` (HSTS, X-Frame-Options DENY, nosniff, Permissions-Policy)
- Tous les liens externes en `rel="noopener noreferrer"`
- `dangerouslySetInnerHTML` uniquement sur le JSON-LD (généré côté serveur depuis des constantes)

---

## 📦 Déploiement

Déployé sur Vercel : [visages-du-monde.vercel.app](https://visages-du-monde.vercel.app)

Git push sur `main` → rebuild auto Vercel.

Variables d'env publiques à définir dans le dashboard Vercel (Settings → Environment Variables) :
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_AGENCE_PHONE`
- `NEXT_PUBLIC_CLICRDV_URL`

---

© 2026 Visages du Monde Brest — Site conçu par CRUX STUDIO.
