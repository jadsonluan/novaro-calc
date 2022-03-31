import { getFinalDamage } from "./atk.js";
import { getHP } from "./hp.js";
import { getSP } from "./sp.js";

const character = {
  baseLevel: 200,
  job: "SURA",
  skill: "TIGER_CANNON_COMBO",
  stats: {
    dex: 100 + 19,
    str: 120 + 39,
    luk: 1 + 2,
    agi: 100 + 22,
    vit: 130 + 30,
    int: 73 + 33,
  },
  hp: {
    flat: 2070,
    percent: 97 + 20,
  },
  sp: {
    flat: 135,
    percent: -5,
  },
  weapon: {
    level: 4,
    type: "knuckle",
    refine: 15,
    atk: 250,
    element: "shadow",
  },
  shadowWeaponRefine: 5,
  equipATK: 651,
  // nao funciona no nova para consumiveis
  consumableATK: 0,
  // parecido com consumableATK mas o nova usa esse invés do consumableATK para alguns itens
  bonusStatusATK: 0,
  ammoATK: 0,
  pseudoBuffATK: 0,
  masteryATK: 30 + 3 * 15,
  buffATK: 0,
  bypass: 0,
  modifiers: {
    skill: 1 + 2.25,
    melee: 1 + 0.8,
    dmg: 1,
    finalDmg: 1,
    //
    race: 1 + 0.14,
    size: 1 + 0.3,
    class: 1 + 0.33,
    monster: 1,
    targetProperty: 1,
    advancedKatarMastery: 1,
  },
};

// ======= MONSTER
const monster = {
  baseLevel: 10,
  VIT: 1,
  hardDEF: 0,
  hardDEFDebuff: 0,
  element: "holy",
  elementLevel: 1,
  race: "formless",
  size: "small",
  boss: false,
};

const minFinalDmg = getFinalDamage("min", character, monster);
const maxFinalDmg = getFinalDamage("max", character, monster);

console.log({ minFinalDmg, maxFinalDmg });

console.log({ HP: getHP(character) });

console.log({ SP: getSP(character) });
