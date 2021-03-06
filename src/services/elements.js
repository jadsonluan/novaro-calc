const ELEMENTS = [
  "neutral",
  "water",
  "earth",
  "fire",
  "wind",
  "poison",
  "holy",
  "shadow",
  "ghost",
  "undead",
];

const ELEMENTS_LV1 = [
  [100, 100, 100, 100, 100, 100, 100, 100, 70, 100],
  [100, 25, 100, 90, 175, 100, 100, 100, 70, 100],
  [100, 100, 25, 150, 90, 125, 100, 100, 70, 100],
  [100, 150, 90, 25, 100, 125, 100, 100, 70, 100],
  [100, 90, 150, 100, 25, 100, 100, 100, 70, 100],
  [100, 100, 100, 100, 100, 0, 100, 50, 100, 50],
  [100, 75, 75, 75, 75, 75, 0, 125, 75, 100],
  [100, 100, 100, 100, 100, 50, 125, 0, 75, 0],
  [70, 100, 100, 100, 100, 100, 100, 100, 125, 100],
  [100, 100, 100, 125, 100, -25, 150, -25, 100, 0],
];

const ELEMENTS_LV2 = [
  [100, 100, 100, 100, 100, 100, 100, 100, 50, 100],
  [100, 0, 100, 80, 175, 75, 100, 100, 75, 75],
  [100, 100, 0, 175, 80, 125, 100, 100, 75, 75],
  [100, 175, 90, 0, 100, 125, 100, 100, 75, 75],
  [100, 80, 175, 100, 0, 125, 100, 100, 75, 75],
  [100, 100, 100, 100, 100, 0, 100, 25, 75, 25],
  [100, 50, 50, 50, 50, 50, -25, 150, 50, 125],
  [100, 75, 75, 75, 75, 25, 150, -25, 50, 0],
  [50, 100, 100, 100, 100, 75, 100, 100, 150, 100],
  [100, 100, 100, 150, 100, -50, 175, -50, 125, 0],
];

const ELEMENTS_LV3 = [
  [100, 100, 100, 100, 100, 100, 100, 100, 0, 100],
  [100, -25, 100, 70, 200, 50, 100, 100, 50, 50],
  [100, 100, -25, 200, 80, 100, 100, 100, 50, 50],
  [100, 200, 70, -25, 100, 100, 100, 100, 50, 50],
  [100, 70, 200, 100, -25, 100, 100, 100, 50, 50],
  [100, 100, 100, 100, 100, 0, 125, 0, 50, 0],
  [100, 25, 25, 25, 25, 25, -50, 175, 25, 150],
  [100, 50, 50, 50, 50, 0, 175, -50, 25, 0],
  [0, 100, 100, 100, 100, 50, 100, 100, 175, 100],
  [100, 125, 100, 175, 100, -75, 200, -75, 150, 0],
];

const ELEMENTS_LV4 = [
  [100, 100, 100, 100, 100, 100, 100, 100, 0, 100],
  [100, -50, 100, 60, 200, 25, 75, 75, 25, 25],
  [100, 100, -50, 200, 60, 75, 75, 75, 25, 25],
  [100, 200, 60, -50, 100, 75, 75, 75, 25, 25],
  [100, 60, 200, 100, -50, 75, 75, 75, 25, 25],
  [100, 75, 75, 75, 75, 0, 125, -25, 25, -25],
  [100, 0, 0, 0, 25, 0, -100, 200, 0, 175],
  [100, 25, 25, 25, 25, -25, 200, -100, 0, 0],
  [0, 100, 100, 100, 100, 25, 100, 100, 200, 100],
  [100, 150, 50, 200, 100, -100, 200, -100, 175, 0],
];

const ELEMENT_TABLES = [ELEMENTS_LV1, ELEMENTS_LV2, ELEMENTS_LV3, ELEMENTS_LV4];

export function getPropertyModifier(
  weaponElement,
  monsterElement,
  monsterElementLevel
) {
  const table = ELEMENT_TABLES[monsterElementLevel - 1];
  const weaponElementIndex = ELEMENTS.indexOf(weaponElement);
  const monsterElementIndex = ELEMENTS.indexOf(monsterElement);

  const mod = table[monsterElementIndex][weaponElementIndex];
  return mod / 100;
}
