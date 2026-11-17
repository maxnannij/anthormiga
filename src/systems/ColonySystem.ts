import { ColonyState, INITIAL_COLONY } from '../data/types';

/**
 * Sistema de colonia Pheidole.
 * 
 * Diferencias clave vs Atta (leafcutters):
 * - No hay fungus farm. Comida = semillas + proteína.
 * - Majors son necesarios para moler semillas grandes (rawSeeds → seeds).
 * - Ratio majors/minors es decisión estratégica (5-25% típico).
 * - Minors hacen casi todo el trabajo diario.
 */
export class ColonySystem {
  state: ColonyState;

  constructor() {
    this.state = { ...INITIAL_COLONY };
  }

  get totalWorkers() {
    return this.state.minors + this.state.majors;
  }

  get majorRatio() {
    if (this.totalWorkers === 0) return 0;
    return this.state.majors / this.totalWorkers;
  }

  /** Produce un huevo (requiere proteína) */
  layEgg(): boolean {
    if (!this.state.queen || this.state.protein < 1) return false;
    this.state.protein -= 1;
    this.state.eggs += 1;
    return true;
  }

  /** Desarrolla huevos → larvas → adultas (según alimentación) */
  advanceBrood() {
    // Huevos → larvas
    if (this.state.eggs > 0 && this.state.protein >= 1) {
      const convert = Math.min(this.state.eggs, Math.floor(this.state.protein / 1));
      this.state.eggs -= convert;
      this.state.larvae += convert;
      this.state.protein -= convert;
    }

    // Larvas → adultas (si hay suficiente comida, más chance de major si hay exceso)
    if (this.state.larvae > 0) {
      const foodAvailable = this.state.seeds + this.state.protein;
      if (foodAvailable >= 2) {
        this.state.larvae -= 1;
        this.state.seeds = Math.max(0, this.state.seeds - 1);
        this.state.protein = Math.max(0, this.state.protein - 1);

        // Decisión de casta: más comida + ratio bajo de majors → más chance de major
        const wantMajor =
          this.majorRatio < 0.18 &&
          (this.state.seeds > 8 || Math.random() < 0.25);

        if (wantMajor) {
          this.state.majors += 1;
        } else {
          this.state.minors += 1;
        }
      }
    }
  }

  /** Majors muelen semillas crudas */
  millSeeds(amount: number = 1): number {
    if (this.state.majors < 1 || this.state.rawSeeds < 1) return 0;
    const milled = Math.min(amount, this.state.rawSeeds, this.state.majors * 2);
    this.state.rawSeeds -= milled;
    this.state.seeds += milled;
    return milled;
  }

  /** Forrajeo de minors (simplificado) */
  forage(): { seeds: number; protein: number; rawSeeds: number } {
    if (this.state.minors < 1) return { seeds: 0, protein: 0, rawSeeds: 0 };

    const power = Math.min(this.state.minors, 12);
    const seeds = Math.floor(Math.random() * power * 0.4);
    const protein = Math.floor(Math.random() * power * 0.3);
    const rawSeeds = Math.floor(Math.random() * power * 0.25);

    this.state.seeds += seeds;
    this.state.protein += protein;
    this.state.rawSeeds += rawSeeds;

    return { seeds, protein, rawSeeds };
  }

  /** Consumo diario de comida */
  dailyConsumption() {
    const workers = this.totalWorkers;
    const consumeSeeds = Math.ceil(workers * 0.15);
    const consumeProtein = Math.ceil(workers * 0.08 + (this.state.queen ? 0.5 : 0));

    this.state.seeds = Math.max(0, this.state.seeds - consumeSeeds);
    this.state.protein = Math.max(0, this.state.protein - consumeProtein);

    // Si no hay comida, riesgo de pérdida de hormigas
    if (this.state.seeds + this.state.protein < 2 && workers > 3) {
      if (Math.random() < 0.3) {
        if (this.state.minors > 0) this.state.minors -= 1;
        else if (this.state.majors > 1) this.state.majors -= 1;
      }
    }
  }

  nextDay() {
    this.state.day += 1;
    this.forage();
    this.millSeeds(3);
    this.advanceBrood();
    this.dailyConsumption();
  }
}
