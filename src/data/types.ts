/** Tipos centrales del juego Anthormiga (Pheidole) */

export type Caste = 'minor' | 'major' | 'queen';

export type ResourceType = 'seed' | 'protein' | 'larva';

export interface AntStats {
  caste: Caste;
  speed: number;
  strength: number;   // capacidad de carga / molienda
  defense: number;
  energy: number;
  maxEnergy: number;
}

export interface ColonyState {
  day: number;
  minors: number;
  majors: number;
  queen: boolean;
  eggs: number;
  larvae: number;
  seeds: number;      // semillas molidas / procesadas
  protein: number;    // insectos / proteína
  rawSeeds: number;   // semillas sin moler (necesitan majors)
  nestRooms: number;
  tunnels: number;
}

export interface RoomDef {
  id: string;
  name: string;
  costSeeds: number;
  costProtein: number;
  effect: string;
}

export const INITIAL_COLONY: ColonyState = {
  day: 1,
  minors: 8,
  majors: 1,
  queen: true,
  eggs: 0,
  larvae: 2,
  seeds: 12,
  protein: 6,
  rawSeeds: 4,
  nestRooms: 1,
  tunnels: 0,
};

export const CASTE_STATS: Record<Caste, Omit<AntStats, 'energy' | 'maxEnergy'>> = {
  minor: {
    caste: 'minor',
    speed: 90,
    strength: 1,
    defense: 1,
  },
  major: {
    caste: 'major',
    speed: 55,
    strength: 5,   // muele semillas grandes
    defense: 8,
  },
  queen: {
    caste: 'queen',
    speed: 20,
    strength: 0,
    defense: 2,
  },
};
