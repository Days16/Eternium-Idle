export interface GameData {
  gold: number;
  stone: number;
  iron: number;
  copper: number;
  silver: number;
  food: number;
  gems: number;
  miningLevel: number;
  combatLevel: number;
  explorationLevel: number;
  upgrades: {
    mining: number;
    combat: number;
  };
  unlocked: {
    combat: boolean;
    cooking: boolean;
    exploration: boolean;
  };
  achievements: string[];
  stats: {
    combatsWon: number;
    recipesCooked: number;
    explorations: number;
  };
  lastUpdate: number;
  dev: boolean;
}

export const defaultGameData: GameData = {
  gold: 0,
  stone: 0,
  iron: 0,
  copper: 0,
  silver: 0,
  food: 0,
  gems: 0,
  miningLevel: 1,
  combatLevel: 1,
  explorationLevel: 1,
  upgrades: {
    mining: 0,
    combat: 0,
  },
  unlocked: {
    combat: false,
    cooking: false,
    exploration: false,
  },
  achievements: [],
  stats: {
    combatsWon: 0,
    recipesCooked: 0,
    explorations: 0,
  },
  lastUpdate: Date.now(),
  dev: false,
}; 