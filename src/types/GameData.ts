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
    cooking: number;
    exploration: number;
    blacksmith: number;
  };
  unlocked: {
    combat: boolean;
    cooking: boolean;
    exploration: boolean;
    blacksmith: boolean;
  };
  achievements: string[];
  stats: {
    combatsWon: number;
    recipesCooked: number;
    explorations: number;
  };
  equipment: {
    sword: boolean;
    armor: boolean;
    helmet: boolean;
  };
  foods: {
    bread: number;
    soup: number;
    stew: number;
    pie: number;
  };
  herbs: number;
  lastUpdate: number;
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
    cooking: 0,
    exploration: 0,
    blacksmith: 0,
  },
  unlocked: {
    combat: false,
    cooking: false,
    exploration: false,
    blacksmith: false,
  },
  achievements: [
    // Ejemplo: 'ach_cook_bread1', 'ach_cook_soup1', 'ach_cook_stew1', 'ach_cook_pie1',
    // 'ach_forge_sword1', 'ach_forge_armor1', 'ach_forge_helmet1',
    // 'ach_upgrade_blacksmith1', 'ach_upgrade_cooking1', ...
  ],
  stats: {
    combatsWon: 0,
    recipesCooked: 0,
    explorations: 0,
  },
  equipment: {
    sword: false,
    armor: false,
    helmet: false,
  },
  foods: {
    bread: 0,
    soup: 0,
    stew: 0,
    pie: 0,
  },
  herbs: 0,
  lastUpdate: Date.now(),
}; 