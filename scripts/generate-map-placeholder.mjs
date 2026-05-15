#!/usr/bin/env node
/**
 * generate-map-placeholder.mjs
 *
 * Génère un placeholder visuel pour la section Agence — utilisé tant que
 * Guillaume n'a pas screenshoté la vraie carte Google Maps du quartier.
 *
 * Output : /public/photos/map-brest.jpg (1200 × 800, JPG quality 90)
 *
 * Design : fond cream légèrement teinté, motif quadrillage très discret
 * pour évoquer une carte, marker pin pétrole centré, étiquette adresse.
 * Quand le screenshot réel sera prêt, écraser ce fichier (même nom, même
 * emplacement).
 */

import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'public/photos/map-brest.jpg');

const W = 1200;
const H = 800;

/**
 * On construit l'image en SVG (entièrement vectoriel, contrôle total),
 * puis sharp rastérise en JPG.
 */
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Fond légèrement dégradé pour donner de la profondeur -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0EBE0"/>
      <stop offset="100%" stop-color="#FAF7F2"/>
    </linearGradient>
    <!-- Motif quadrillage très discret évoquant une carte -->
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1A1A1A" stroke-width="0.5" opacity="0.06"/>
    </pattern>
    <!-- "Routes" stylisées en arrière-plan -->
    <pattern id="streets" width="240" height="240" patternUnits="userSpaceOnUse">
      <path d="M 0 80 L 240 100" stroke="#0A3B5C" stroke-width="1.5" opacity="0.08" fill="none"/>
      <path d="M 100 0 L 110 240" stroke="#0A3B5C" stroke-width="1.5" opacity="0.08" fill="none"/>
      <path d="M 0 200 L 240 180" stroke="#0A3B5C" stroke-width="1" opacity="0.05" fill="none"/>
    </pattern>
  </defs>

  <!-- Couches de fond -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#streets)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- Cercle "périmètre quartier" autour du marker -->
  <circle cx="${W / 2}" cy="${H / 2 - 20}" r="140" fill="#1499C7" opacity="0.06"/>
  <circle cx="${W / 2}" cy="${H / 2 - 20}" r="80" fill="#1499C7" opacity="0.1"/>

  <!-- Marker pin pétrole, centré -->
  <g transform="translate(${W / 2 - 32}, ${H / 2 - 100})">
    <!-- Ombre sous le pin -->
    <ellipse cx="32" cy="92" rx="20" ry="4" fill="#0A3B5C" opacity="0.2"/>
    <!-- Pin -->
    <path d="M 32 0
             C 14 0 0 14 0 32
             C 0 56 32 88 32 88
             C 32 88 64 56 64 32
             C 64 14 50 0 32 0 Z"
          fill="#1499C7"/>
    <!-- Cercle blanc dans le pin -->
    <circle cx="32" cy="32" r="10" fill="#FAF7F2"/>
  </g>

  <!-- Étiquette adresse, sous le pin -->
  <g transform="translate(${W / 2 - 200}, ${H / 2 + 30})">
    <rect x="0" y="0" width="400" height="80" rx="8" fill="#FAF7F2" opacity="0.95"/>
    <text x="200" y="32" text-anchor="middle"
          font-family="Inter, sans-serif" font-size="18" font-weight="600" fill="#0A3B5C">
      44 rue Emile Zola
    </text>
    <text x="200" y="56" text-anchor="middle"
          font-family="Inter, sans-serif" font-size="14" fill="#4A4A4A">
      29200 Brest · Tram Siam
    </text>
  </g>
</svg>
`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(OUT);

console.log(`✓ ${OUT}  (${W}×${H})`);
