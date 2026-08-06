/**
 * Motifs cropped pixel-exactly from the design-sheet screenshots.
 */
import git from '../assets/motifs/code/git.png';
import typescript from '../assets/motifs/code/typescript.png';
import javascript from '../assets/motifs/code/javascript.png';
import html5 from '../assets/motifs/code/html5.png';
import vscode from '../assets/motifs/code/vscode.png';
import css3 from '../assets/motifs/code/css3.png';
import django from '../assets/motifs/code/django.png';
import angular from '../assets/motifs/code/angular.png';
import terminal from '../assets/motifs/code/terminal.png';
import python from '../assets/motifs/code/python.png';
import github from '../assets/motifs/code/github.png';
import node from '../assets/motifs/code/node.png';
import bootstrap from '../assets/motifs/code/bootstrap.png';
import vue from '../assets/motifs/code/vue.png';
import react from '../assets/motifs/code/react.png';
import sass from '../assets/motifs/code/sass.png';
import database from '../assets/motifs/code/database.png';
import firebase from '../assets/motifs/code/firebase.png';
import code_back from '../assets/motifs/code/code_back.png';

import squid_circle from '../assets/motifs/gaming/squid_circle.png';
import squid_square from '../assets/motifs/gaming/squid_square.png';
import squid_triangle from '../assets/motifs/gaming/squid_triangle.png';
import geo_pattern from '../assets/motifs/gaming/geo_pattern.png';
import creeper from '../assets/motifs/gaming/creeper.png';
import mushroom from '../assets/motifs/gaming/mushroom.png';
import rubiks from '../assets/motifs/gaming/rubiks.png';
import cool_banana from '../assets/motifs/gaming/cool_banana.png';
import controller from '../assets/motifs/gaming/controller.png';
import pacman_ghost from '../assets/motifs/gaming/pacman_ghost.png';
import coin from '../assets/motifs/gaming/coin.png';
import dungeon_map from '../assets/motifs/gaming/dungeon_map.png';
import medal from '../assets/motifs/gaming/medal.png';
import pacman from '../assets/motifs/gaming/pacman.png';
import gameboy from '../assets/motifs/gaming/gameboy.png';
import puzzle from '../assets/motifs/gaming/puzzle.png';
import ace_diamonds from '../assets/motifs/gaming/ace_diamonds.png';
import play_button from '../assets/motifs/gaming/play_button.png';
import gaming_back from '../assets/motifs/gaming/gaming_back.png';

import da_ramen from '../assets/motifs/da/da_ramen.png';
import da_soup from '../assets/motifs/da/da_soup.png';
import da_egg from '../assets/motifs/da/da_egg.png';
import da_sakura from '../assets/motifs/da/da_sakura.png';
import da_j_logo from '../assets/motifs/da/da_j_logo.png';
import da_chef_hat from '../assets/motifs/da/da_chef_hat.png';
import da_leaf from '../assets/motifs/da/da_leaf.png';
import da_basket from '../assets/motifs/da/da_basket.png';
import da_pokeball from '../assets/motifs/da/da_pokeball.png';
import da_grid from '../assets/motifs/da/da_grid.png';
import da_smile from '../assets/motifs/da/da_smile.png';
import da_chevron from '../assets/motifs/da/da_chevron.png';
import da_chat from '../assets/motifs/da/da_chat.png';
import da_sombrero from '../assets/motifs/da/da_sombrero.png';
import da_clover from '../assets/motifs/da/da_clover.png';
import da_user from '../assets/motifs/da/da_user.png';
import da_wave from '../assets/motifs/da/da_wave.png';
import da_exchange from '../assets/motifs/da/da_exchange.png';
import da_back from '../assets/motifs/da/da_back.png';

import fries from '../assets/motifs/food/fries.png';
import pizza from '../assets/motifs/food/pizza.png';
import sandwich from '../assets/motifs/food/sandwich.png';
import donut from '../assets/motifs/food/donut.png';
import sushi from '../assets/motifs/food/sushi.png';
import corndog from '../assets/motifs/food/corndog.png';
import burger from '../assets/motifs/food/burger.png';
import pretzel from '../assets/motifs/food/pretzel.png';
import cupcake from '../assets/motifs/food/cupcake.png';
import cake from '../assets/motifs/food/cake.png';
import flan from '../assets/motifs/food/flan.png';
import chocolate from '../assets/motifs/food/chocolate.png';
import chicken from '../assets/motifs/food/chicken.png';
import wrap from '../assets/motifs/food/wrap.png';
import taco from '../assets/motifs/food/taco.png';
import icecream from '../assets/motifs/food/icecream.png';
import salad from '../assets/motifs/food/salad.png';
import macarons from '../assets/motifs/food/macarons.png';
import food_back from '../assets/motifs/food/food_back.png';

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
  code_back,

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
  gaming_back,

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
  da_back,

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
  food_back,
};

/**
 * Returns the motif image URL, or undefined if unknown.
 */
export function motifUrl(motif: string): string | undefined {
  return MOTIF_IMAGES[motif];
}

/**
 * Renders a motif as a full-bleed card face background style snippet.
 */
export function motifFaceStyle(motif: string): string {
  const src = MOTIF_IMAGES[motif];
  if (!src) {
    return '';
  }
  return `background-image:url('${src}')`;
}

/**
 * Renders a motif as an img (settings preview fallback).
 */
export function renderMotif(motif: string): string {
  const src = MOTIF_IMAGES[motif];
  if (src) {
    return `<img class="motif-img" src="${src}" alt="" draggable="false" />`;
  }

  return motif
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
