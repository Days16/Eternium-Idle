// Constantes del juego
export const GAME_CONSTANTS = {
  // Intervalos de tiempo
  AUTOSAVE_INTERVAL: 30000, // 30 segundos
  MINING_INTERVAL: 1000, // 1 segundo
  
  // Costos de mejoras
  UPGRADE_COSTS: {
    mining: 50,
    combat: 60,
    cooking: 40,
    exploration: 80,
    blacksmith: 70,
  },
  
  // Requisitos de desbloqueo
  UNLOCK_REQUIREMENTS: {
    combat: { gold: 100 },
    cooking: { stone: 100 },
    exploration: { gold: 200, stone: 200 },
    blacksmith: { iron: 100 },
  },
  
  // Probabilidades de minerales
  ORE_PROBABILITIES: {
    gold: 0.25,
    stone: 0.35,
    iron: 0.18,
    copper: 0.12,
    silver: 0.10,
  },
  
  // Niveles de desbloqueo de minerales
  ORE_UNLOCK_LEVELS: {
    iron: 2,
    copper: 4,
    silver: 6,
  },
} as const;

// Lista de equipamiento
export const EQUIPMENT_LIST = [
  {
    key: 'sword',
    name: 'sword',
    cost: { gold: 20, stone: 10 },
    bonus: { atk: 3 },
    icon: '🗡️',
  },
  {
    key: 'armor',
    name: 'armor',
    cost: { gold: 30, stone: 20 },
    bonus: { def: 5 },
    icon: '🛡️',
  },
  {
    key: 'helmet',
    name: 'helmet',
    cost: { gold: 15, stone: 15 },
    bonus: { hp: 10 },
    icon: '⛑️',
  },
] as const;

// Lista de minerales
export const ORES = [
  { key: 'gold', label: 'gold', emoji: '🪙', prob: 0.25 },
  { key: 'stone', label: 'stone', emoji: '🪨', prob: 0.35 },
  { key: 'iron', label: 'iron', emoji: '⛓️', prob: 0.18 },
  { key: 'copper', label: 'copper', emoji: '🥉', prob: 0.12 },
  { key: 'silver', label: 'silver', emoji: '🥈', prob: 0.10 },
] as const; 