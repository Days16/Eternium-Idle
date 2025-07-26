// Re-exportar todos los tipos
export * from './GameData';

// Tipos adicionales para el juego
export interface Equipment {
  sword: boolean;
  armor: boolean;
  helmet: boolean;
}

export interface MiningData {
  gold: number;
  stone: number;
  lastUpdate: number;
}

export interface UpgradeCosts {
  mining: number;
  combat: number;
  cooking: number;
  exploration: number;
  blacksmith: number;
}

export interface UnlockRequirements {
  combat: { gold: number };
  cooking: { stone: number };
  exploration: { gold: number; stone: number };
  blacksmith: { iron: number };
} 