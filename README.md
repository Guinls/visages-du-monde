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
  /ui                 → Button, Container, Eyebrow, Logo, PartnerLabels,
                        SectionReveal
/data                 → univers, inspirations, avis, horaires,
                        garanties, reseau, methode
/lib                  → utils (cn, constantes globales)
/public
  /photos             → toutes les photos (kebab-case .png)
  /labels             → ⚠️ placeholders typographiques (cf. ci-dessous)
  logo.svg            → ⚠️ logo TEMPORAIRE
```

---

## ⚠️ Logo VDM — à remplacer par le PNG officiel

Le fichier `/public/logo.png` (logo officiel du réseau, fond transparent, ≥ 200px de haut) **n'est pas encore en place**. Le site sert actuellement `/public/logo.svg` (typo recréée, **non conforme à la charte officielle**).

**Pour basculer** :

1. Poser `logo.png` dans `/public/`
2. Dans [`components/ui/Logo.tsx`](components/ui/Logo.tsx) :
   - Remplacer `const SRC = '/logo.svg'` par `const SRC = '/logo.png'`
   - Ajuster `RATIO` (largeur / hauteur intrinsèques du PNG)
3. Le composant `<Logo />` est utilisé partout (Nav, Footer, IntroLoader, info-card de la carte) — un seul changement propage.

Variantes via prop :
- `variant="light"` → couleur native (bleu pétrole) sur fonds clairs
- `variant="dark"` → filtre CSS qui blanchit le logo pour fonds sombres / photos

---

## ⚠️ Labels partenaires — à remplacer par les SVG officiels

Le dossier `/public/labels/` contient **5 fichiers SVG placeholders strictement typographiques** :

| Fichier                            | À remplacer par                                |
| ---------------------------------- | ---------------------------------------------- |
| `visages-du-monde.svg`             | Logo officiel du réseau VDM                    |
| `selectour.svg`                    | Logo officiel Selectour                        |
| `atout-france.svg`                 | Logo officiel Atout France                     |
| `apst.svg`                         | Logo officiel APST                             |
| `axa.svg`                          | Logo officiel AXA                              |

**Ces placeholders ne reproduisent PAS les logos officiels** — ils affichent seulement le nom de la marque en sans-serif générique, en attendant que tu obtiennes :
1. Les fichiers SVG officiels via chaque partenaire
2. L'autorisation d'usage écrite pour chacun

Une fois les SVG officiels reçus, écrase simplement les placeholders en gardant les mêmes noms de fichier. Le composant [`components/ui/PartnerLabels.tsx`](components/ui/PartnerLabels.tsx) les chargera automatiquement.

Les labels apparaissent à deux endroits :
- Section "Confiance" PARTIE B (bande logos sur navy-dark, 48px de haut)
- Footer Zone 2 (bande "Garanties & certifications", 36px de haut)

---

## 🖼️ Photos

Toutes les photos vivent dans `/public/photos/` en **kebab-case** (`.png`).

**Résolutions cibles** (à atteindre avant prod) :
- Hero : min 2400px sur le côté le plus long (idéal 3200-4000px)
- Cartes univers / inspirations : min 1600px
- Mosaïque Instagram : min 800px

`next/image` convertit automatiquement en WebP/AVIF, quality 85, blur placeholder géré par Next.

---

## ✏️ Contenus

Tous les textes éditoriaux sont en français dans `/data/*.ts` :

| Fichier                | Contenu                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `data/univers.ts`      | Les 4 univers (section "Vos prochains horizons")              |
| `data/inspirations.ts` | Les 4 inspirations du moment — **sans prix**                  |
| `data/avis.ts`         | Témoignages Google + Place ID + URL Google Reviews            |
| `data/horaires.ts`     | Horaires (format affichage + Schema.org)                      |
| `data/garanties.ts`    | 6 engagements (Selectour, Atout France, APST, RCP AXA…)       |
| `data/reseau.ts`       | Agences VDM en Bretagne + chiffres réseau                     |
| `data/methode.ts`      | Les 4 étapes de la méthode                                    |

### Règles éditoriales

- **Équipe anonymisée** : ne pas nommer Cécile / Marie dans le rédactionnel. "L'équipe", "nos conseillères".
- **Citations clients (avis)** : laissées littérales, même si elles mentionnent un prénom de conseillère — c'est la parole du client, pas du rédactionnel.
- **Pas un site marchand** : aucun prix affiché en gros.

---

## ☎️ Téléphone (placeholder)

Centralisé dans [`lib/utils.ts`](lib/utils.ts) (`AGENCE_PHONE`), placeholder `+33 2 XX XX XX XX`.

```bash
# Recommandé prod
cp .env.example .env.local
# puis NEXT_PUBLIC_AGENCE_PHONE=+33298XXXXXX
```

Utilisé : Hero CTA, section Agence (gros affichage + info-card overlay), Footer.

---

## 🎨 Design system

Couleurs (Tailwind) :

| Token         | HEX      | Usage                                    |
| ------------- | -------- | ---------------------------------------- |
| `petrol`      | #1499C7  | Couleur signature                        |
| `petrol-dark` | #0F7CA3  | Hover                                    |
| `navy`        | #0A3B5C  | Confiance, Agence                        |
| `navy-dark`   | #082E47  | Bande logos partenaires (Confiance PARTIE B) |
| `cream`       | #FAF7F2  | Fond principal                           |
| `bone`        | #F0EBE0  | Fond secondaire                          |
| `charcoal`    | #1A1A1A  | Texte / footer                           |
| `slate`       | #4A4A4A  | Texte secondaire                         |
| `terracotta`  | #C4633E  | Accent chaud (étoiles, tags)             |

Polices : **Anton** (display), **Inter** (body), **JetBrains Mono** (chiffres, eyebrows).

---

## 🗺️ Carte

Section Agence : **iframe Google Maps "search embed"** (URL `maps.google.com/maps?q=...&output=embed`).

Avantages :
- Pas de clé API → pas de coût, pas de fuite de credential côté client
- Loading="lazy" → ne bloque pas le LCP
- referrerPolicy "no-referrer-when-downgrade"

Une info-card cream est positionnée en surimpression (bottom-left desktop) ou sous la map (mobile), avec logo, adresse, CTA "Itinéraire →".

### 🔜 Upgrade prévu — Mapbox custom

Quand le compte Mapbox CRUX STUDIO sera configuré, remplacer l'iframe par un composant Mapbox GL JS custom (style sépia/navy, marker SVG reprenant la "lune" du logo VDM). Le swap se fait **uniquement** dans [`components/sections/Agence.tsx`](components/sections/Agence.tsx), aucun impact ailleurs.

---

## ⭐ Avis Google

V1 actuelle : 3 témoignages hardcodés dans [`data/avis.ts`](data/avis.ts), avec note agrégée 4,6/5 (11 avis). Le composant affiche un mini-mark "G" qui pointe vers la page Google de l'agence.

### 🔜 Upgrade prévu — Sync auto via Places API

Place ID Brest : `ChIJabmJklm5FkgRvJ0b40JNsrY`

Plan technique pour aller chercher les avis en live :

1. Créer une route `app/api/reviews/route.ts` (server-only, donc clé jamais exposée)
2. Appeler `https://places.googleapis.com/v1/places/{PLACE_ID}?fields=reviews,rating,userRatingCount`
3. Variable d'env serveur (PAS `NEXT_PUBLIC_*`) : `GOOGLE_PLACES_API_KEY`
4. ISR `revalidate: 86400` (24h) pour limiter les appels payants
5. Le composant `Avis.tsx` consomme la route au lieu de `data/avis.ts`

---

## 🎬 Intro animation

`<IntroLoader />` joue 2.4s à la première visite (globe wireframe + avion en orbite + logo + microcopy).

- Flag `vdm-intro-seen` dans `sessionStorage`
- Skip si `prefers-reduced-motion: reduce`
- Pour rejouer en dev : `sessionStorage.clear()` puis reload

---

## ♿ Accessibilité (WCAG 2.1 AA)

- Skip-link "Aller au contenu"
- Contrastes vérifiés
- `alt` descriptif sur toutes les images
- Focus visible (outline pétrole 2px)
- Slider hero `aria-live` polite
- iframe Google Maps : `title` descriptif
- `prefers-reduced-motion` respecté

---

## 🔍 SEO

- Title : "Visages du Monde Brest — Agence de voyages depuis 1952"
- OG image : turquie-mongolfiere.png
- JSON-LD `TravelAgency` complet :
  - `address`, `geo`, `openingHours`
  - `aggregateRating` (4,6/5, 11 avis)
  - **`review[]`** (les 3 avis détaillés)
  - `parentOrganization` → réseau Visages du Monde, fondé 1952
  - `sameAs` (Insta, FB)
- `robots.ts` + `sitemap.ts` auto-générés
- Images WebP/AVIF via `next/image` (quality 85)

---

## 🛡️ Sécurité

- Aucun secret en dur (cf. `.env.example`)
- Headers sécurité par défaut dans `next.config.mjs` (HSTS, X-Frame-Options DENY, nosniff, Permissions-Policy)
- Tous les liens externes en `rel="noopener noreferrer"`
- iframe Google Maps : `referrerPolicy="no-referrer-when-downgrade"`, `allow=""` (aucune permission accordée)
- `dangerouslySetInnerHTML` uniquement sur le JSON-LD (généré côté serveur depuis des constantes)

---

## 📦 Déploiement

Déployé sur Vercel : [visages-du-monde.vercel.app](https://visages-du-monde.vercel.app)

Push sur `main` → rebuild auto.

Variables d'env publiques (dashboard Vercel) :
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_AGENCE_PHONE`
- `NEXT_PUBLIC_CLICRDV_URL`

Variables serveur (à ajouter quand on branchera la Places API) :
- `GOOGLE_PLACES_API_KEY` (jamais préfixée `NEXT_PUBLIC_*`)

---

© 2026 Visages du Monde Brest — Site conçu par CRUX STUDIO.
