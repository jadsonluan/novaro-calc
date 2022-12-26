export const deepCopy = (obj: Object) => JSON.parse(JSON.stringify(obj));

export const getTraitBonuses = (trait: "pow" | "con" | "spl" | "crt", oldValue: number, newBonus: number) => {
  const traits: Record<"pow" | "con" | "spl" | "crt", (value: number) => number> = {
    pow: (value: number) => Math.floor(value / 3),
    spl: (value: number) => Math.floor(value / 3),
    crt: (value: number) => Math.floor(value / 3),
    con: (value: number) => Math.floor(value / 5),
  }

  return traits[trait](newBonus) - traits[trait](oldValue);
}

export const deepCopyNestedObject = (obj: Record<string, any>) => obj ? JSON.parse(JSON.stringify(obj)) : {};
