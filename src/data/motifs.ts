/**
 * Registers motif assets and renders card-front or card-back motif markup.
 */

import { CODE_MOTIF_IMAGES } from './motifImages/code';
import { DA_MOTIF_IMAGES } from './motifImages/da';
import { FOOD_MOTIF_IMAGES } from './motifImages/food';
import { GAMING_MOTIF_IMAGES } from './motifImages/gaming';

/** Exact bundled vector-asset URLs keyed by motif identifier. */
export const MOTIF_IMAGES: Record<string, string> = {
  ...CODE_MOTIF_IMAGES,
  ...GAMING_MOTIF_IMAGES,
  ...DA_MOTIF_IMAGES,
  ...FOOD_MOTIF_IMAGES,
};

/**
 * Clean card-back motifs (monitor with code brackets) matching the preview screenshots.
 */
const monitorBack = (color: string): string =>
  `<svg class="motif-svg card-back-logo" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g fill="none" stroke="${color}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="18" width="76" height="54" rx="7"/>
      <path d="M45 36L31 44.5 45 53M55 36l14 8.5L55 53"/>
      <path d="M24 82h52"/>
    </g>
  </svg>`;

/** Card-back motifs; card fronts use the exact design-sheet images. */
export const MOTIF_MARKUP: Record<string, string> = {
  code_back: monitorBack('rgba(218,255,249,0.38)'),
  da_back: monitorBack('rgba(208,240,250,0.34)'),
  food_back: monitorBack('rgba(255,244,231,0.42)'),
};

/**
 * Returns the motif image URL, or undefined if unknown.
 *
 * @param motif - Identifier used by a theme's motif list.
 * @returns The bundled asset URL, or `undefined` when no image is registered.
 */
export function motifUrl(motif: string): string | undefined {
  return MOTIF_IMAGES[motif];
}

function motifImage(src: string): string {
  return `<img class="motif-img" src="${src}" alt="" width="1024" height="1024" decoding="async" draggable="false" />`;
}

function escapeMotif(motif: string): string {
  return motif
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * Renders a motif as SVG markup or a high-res motif image.
 *
 * @param motif - Registered motif identifier or fallback text to escape.
 * @returns Safe card markup for the requested motif.
 */
export function renderMotif(motif: string): string {
  const markup = MOTIF_MARKUP[motif];
  if (markup) {
    return markup;
  }
  const src = MOTIF_IMAGES[motif];
  if (src) {
    return motifImage(src);
  }
  return escapeMotif(motif);
}
