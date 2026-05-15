#!/usr/bin/env node
/**
 * convert-photos.mjs
 *
 * Convertit toutes les photos `/public/photos/*.png` en `.jpg` quality 90
 * (mozjpeg pour meilleure compression). Supprime les `.png` originaux.
 *
 * Le `/public/logo.png` (à la racine de /public) n'est PAS touché — il
 * conserve sa transparence.
 *
 * Usage : `npm run convert-photos` (one-shot).
 */

import { readdirSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIR = resolve(ROOT, 'public/photos');

const files = readdirSync(DIR).filter((f) => f.endsWith('.png'));

if (files.length === 0) {
  console.log('Rien à convertir (aucun .png dans /public/photos).');
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const input = join(DIR, file);
  const output = input.replace(/\.png$/, '.jpg');

  const { size: sizeBefore } = await import('node:fs').then((fs) =>
    fs.promises.stat(input),
  );

  await sharp(input).jpeg({ quality: 90, mozjpeg: true }).toFile(output);

  const { size: sizeAfter } = await import('node:fs').then((fs) =>
    fs.promises.stat(output),
  );

  totalBefore += sizeBefore;
  totalAfter += sizeAfter;

  unlinkSync(input);
  const pct = Math.round((1 - sizeAfter / sizeBefore) * 100);
  console.log(
    `✓ ${file} → ${file.replace(/\.png$/, '.jpg')}  ${(sizeBefore / 1024).toFixed(0)} KB → ${(sizeAfter / 1024).toFixed(0)} KB  (-${pct}%)`,
  );
}

console.log(
  `\n✓ ${files.length} photos converties. Total : ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`,
);
console.log('\n⚠️  Pense à mettre à jour les références `.png` → `.jpg` dans le code.');
