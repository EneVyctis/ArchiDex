export interface Archimonstre {
    id: number;
    name: string;
    picture: string;
    life: number;
    damage: number;
    resistances: [string] | [string, string] | [string, string, string];
    created: Date;
}

export const ARCHIMONSTRE_RULES = {
  NAME_PATTERN: /^[a-zA-Zéè' ]+$/,
  MAX_NAME: 25,
  MIN_NAME: 3,
  MAX_LIFE: 12000,
  HIGH_LIFE: 7500,
  LOW_LIFE: 200,
  MIN_LIFE: 100,
  MAX_DAMAGE: 800,
  MIN_DAMAGE: 10,
  MIN_RES: 1,
  MAX_RES: 3,
} as const;

export function getArchimonstreColor(res: string) : string {
    switch (res) {
      case 'feu':
        return '#EF5350';
      case 'eau':
        return '#42A5F5';
      case 'air':
        return '#66BB6A';
      case 'terre':
        return '#8d6e63';
      default:
        return '#303030';
    }
};

export type ArchimonstreList = Archimonstre[];