#!/usr/bin/env node
/**
 * generate-favicons.mjs
 *
 * Génère les favicons du site à partir du logo officiel `/public/logo.png`.
 *
 * Outputs :
 *  - /app/icon.png           32 × 32  · favicon des onglets navigateur
 *  - /app/apple-icon.png    180 × 180 · icône iOS / écran d'accueil
 *
 * Pourquoi pas de favicon.ico ?
 *   Next.js 14 (App Router) auto-découvre `app/icon.png` et émet les
 *   <link rel="icon"> appropriés. Le format .ico est utile uniquement
 *   pour des navigateurs très anciens (IE ≤ 10) — non pertinents ici.
 *
 * Le logo source est très large (540×262, ratio ~2.06). Le favicon
 * carré va donc apparaître petit avec du vide autour : c'est volontaire,
 * la couleur bleu pétrole reste identifiable dans l'onglet.
 *
 * Usage : `npm run favicons`
 */

import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'public/logo.png');
const APP_DIR = resolve(ROOT, 'app');

// Couleur cream de la charte — utilisée comme fond opaque pour apple-icon
// (iOS rejette la transparence et la remplace par du noir, qui ferait moche).
const CREAM = { r: 250, g: 247, b: 242, alpha: 1 };
// Pour le favicon des onglets, on garde la transparence : les navigateurs
// modernes (dark/light theme) la rendent correctement.
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Padding interne en % de la dimension cible (le logo "respire" dans le carré). */
const INNER_PADDING = 0.12;

async function makeFavicon({ size, outFile, background }) {
  // Place le logo dans un carré "size × size" avec padding.
  const inner = Math.round(size * (1 - INNER_PADDING * 2));

  await sharp(SRC)
    // 1. Resize le logo pour qu'il rentre dans le carré intérieur, en gardant le ratio
    .resize(inner, inner, {
      fit: 'contain',
      background: TRANSPARENT,
    })
    // 2. Étend le canvas à la taille finale, fond opaque ou transparent
    .extend({
      top: Math.round((size - inner) / 2),
      bottom: Math.round((size - inner) / 2),
      left: Math.round((size - inner) / 2),
      right: Math.round((size - inner) / 2),
      background,
    })
    // 3. Sortie PNG
    .png({ compressionLevel: 9 })
    .toFile(outFile);

  console.log(`✓ ${outFile}  (${size}×${size})`);
}

async function main() {
  await mkdir(APP_DIR, { recursive: true });

  await makeFavicon({
    size: 32,
    outFile: resolve(APP_DIR, 'icon.png'),
    background: TRANSPARENT,
  });

  await makeFavicon({
    size: 180,
    outFile: resolve(APP_DIR, 'apple-icon.png'),
    background: CREAM,
  });

  console.log('\n✓ Favicons générés. Relance le serveur Next pour les voir.');
}

main().catch((err) => {
  console.error('✗ Échec génération favicons :', err);
  process.exit(1);
});
