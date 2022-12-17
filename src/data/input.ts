import { Buffs, emptyATKBuffs, emptyMATKBuffs } from "./buffs";
import { Character, emptyCharacter } from "./character";
import { Debuffs, emptyATKDebuffs, emptyMATKDebuffs } from "./debuff";
import { Monster, emptyMonster } from "./monster";

export interface BuildInfo {
  name: string;
  character: Character;
  monster: Monster;
  buffs: Buffs;
  debuffs: Debuffs;
}

export const INITIAL_ATK_BUILD: BuildInfo = {
  name: '',
  character: emptyCharacter,
  monster: emptyMonster,
  buffs: emptyATKBuffs,
  debuffs: emptyATKDebuffs,
};

export const INITIAL_MATK_BUILD: BuildInfo = {
  name: '',
  character: emptyCharacter,
  monster: emptyMonster,
  buffs: emptyMATKBuffs,
  debuffs: emptyMATKDebuffs,
};