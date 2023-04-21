import { Equipment, initialEquipment } from './equipment';
import { Gears } from './equipment';
import { initialGears } from './equipment';
import { EquipmentClass } from './equipment';
import { EquipmentModifiers } from './equipment';

export const equipmentsMock: Equipment[] = [
  {
    ...initialEquipment,
    name: 'Headgear',
    equipmentClass: 'headgear',
    cardSlots: 1,
    cards: [],
    enchantSlots: 1,
    enchats: [],
  },
];
