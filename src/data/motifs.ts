/**
 * CodeVibe uses the original vector assets for lossless scaling.
 */
import git from '../assets/motifs/code/git.svg';
import typescript from '../assets/motifs/code/typescript.svg';
import javascript from '../assets/motifs/code/javascript.svg';
import html5 from '../assets/motifs/code/html5.svg';
import vscode from '../assets/motifs/code/vscode.svg';
import css3 from '../assets/motifs/code/css3.svg';
import django from '../assets/motifs/code/django.svg';
import angular from '../assets/motifs/code/angular.svg';
import terminal from '../assets/motifs/code/terminal.svg';
import python from '../assets/motifs/code/python.svg';
import github from '../assets/motifs/code/github.svg';
import node from '../assets/motifs/code/node.svg';
import bootstrap from '../assets/motifs/code/bootstrap.svg';
import vue from '../assets/motifs/code/vue.svg';
import react from '../assets/motifs/code/react.svg';
import sass from '../assets/motifs/code/sass.svg';
import database from '../assets/motifs/code/database.svg';
import firebase from '../assets/motifs/code/firebase.svg';

import squid_circle from '../assets/motifs/gaming/squid_circle.svg';
import squid_square from '../assets/motifs/gaming/squid_square.svg';
import squid_triangle from '../assets/motifs/gaming/squid_triangle.svg';
import geo_pattern from '../assets/motifs/gaming/geo_pattern.svg';
import creeper from '../assets/motifs/gaming/creeper.svg';
import mushroom from '../assets/motifs/gaming/mushroom.svg';
import rubiks from '../assets/motifs/gaming/rubiks.svg';
import cool_banana from '../assets/motifs/gaming/cool_banana.svg';
import controller from '../assets/motifs/gaming/controller.svg';
import pacman_ghost from '../assets/motifs/gaming/pacman_ghost.svg';
import coin from '../assets/motifs/gaming/coin.svg';
import dungeon_map from '../assets/motifs/gaming/dungeon_map.svg';
import medal from '../assets/motifs/gaming/medal.svg';
import pacman from '../assets/motifs/gaming/pacman.svg';
import gameboy from '../assets/motifs/gaming/gameboy.svg';
import puzzle from '../assets/motifs/gaming/puzzle.svg';
import ace_diamonds from '../assets/motifs/gaming/ace_diamonds.svg';
import play_button from '../assets/motifs/gaming/play_button.svg';

import da_ramen from '../assets/motifs/da/da_ramen.svg';
import da_soup from '../assets/motifs/da/da_soup.svg';
import da_egg from '../assets/motifs/da/da_egg.svg';
import da_sakura from '../assets/motifs/da/da_sakura.svg';
import da_j_logo from '../assets/motifs/da/da_j_logo.svg';
import da_chef_hat from '../assets/motifs/da/da_chef_hat.svg';
import da_leaf from '../assets/motifs/da/da_leaf.svg';
import da_basket from '../assets/motifs/da/da_basket.svg';
import da_pokeball from '../assets/motifs/da/da_pokeball.svg';
import da_grid from '../assets/motifs/da/da_grid.svg';
import da_smile from '../assets/motifs/da/da_smile.svg';
import da_chevron from '../assets/motifs/da/da_chevron.svg';
import da_chat from '../assets/motifs/da/da_chat.svg';
import da_sombrero from '../assets/motifs/da/da_sombrero.svg';
import da_clover from '../assets/motifs/da/da_clover.svg';
import da_user from '../assets/motifs/da/da_user.svg';
import da_wave from '../assets/motifs/da/da_wave.svg';
import da_exchange from '../assets/motifs/da/da_exchange.svg';

import fries from '../assets/motifs/food/fries.svg';
import pizza from '../assets/motifs/food/pizza.svg';
import sandwich from '../assets/motifs/food/sandwich.svg';
import donut from '../assets/motifs/food/donut.svg';
import sushi from '../assets/motifs/food/sushi.svg';
import corndog from '../assets/motifs/food/corndog.svg';
import burger from '../assets/motifs/food/burger.svg';
import pretzel from '../assets/motifs/food/pretzel.svg';
import cupcake from '../assets/motifs/food/cupcake.svg';
import cake from '../assets/motifs/food/cake.svg';
import flan from '../assets/motifs/food/flan.svg';
import chocolate from '../assets/motifs/food/chocolate.svg';
import chicken from '../assets/motifs/food/chicken.svg';
import wrap from '../assets/motifs/food/wrap.svg';
import taco from '../assets/motifs/food/taco.svg';
import icecream from '../assets/motifs/food/icecream.svg';
import salad from '../assets/motifs/food/salad.svg';
import macarons from '../assets/motifs/food/macarons.svg';

export const MOTIF_IMAGES: Record<string, string> = {
  git,
  typescript,
  javascript,
  html5,
  vscode,
  css3,
  django,
  angular,
  terminal,
  python,
  github,
  node,
  bootstrap,
  vue,
  react,
  sass,
  database,
  firebase,

  squid_circle,
  squid_square,
  squid_triangle,
  geo_pattern,
  creeper,
  mushroom,
  rubiks,
  cool_banana,
  controller,
  pacman_ghost,
  coin,
  dungeon_map,
  medal,
  pacman,
  gameboy,
  puzzle,
  ace_diamonds,
  play_button,

  da_ramen,
  da_soup,
  da_egg,
  da_sakura,
  da_j_logo,
  da_chef_hat,
  da_leaf,
  da_basket,
  da_pokeball,
  da_grid,
  da_smile,
  da_chevron,
  da_chat,
  da_sombrero,
  da_clover,
  da_user,
  da_wave,
  da_exchange,

  fries,
  pizza,
  sandwich,
  donut,
  sushi,
  corndog,
  burger,
  pretzel,
  cupcake,
  cake,
  flan,
  chocolate,
  chicken,
  wrap,
  taco,
  icecream,
  salad,
  macarons,
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
 */
export function motifUrl(motif: string): string | undefined {
  return MOTIF_IMAGES[motif];
}

/**
 * Renders a motif as SVG markup or a high-res motif image.
 */
export function renderMotif(motif: string): string {
  const markup = MOTIF_MARKUP[motif];
  if (markup) {
    return markup;
  }

  const src = MOTIF_IMAGES[motif];
  if (src) {
    return `<img class="motif-img" src="${src}" alt="" width="1024" height="1024" decoding="async" draggable="false" />`;
  }

  return motif
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
