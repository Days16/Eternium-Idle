import { ORES } from '../constants/gameConstants';

// Función para obtener un mineral aleatorio
export function getRandomOre(unlockedOres: typeof ORES) {
  const roll = Math.random();
  let acc = 0;
  for (const ore of unlockedOres) {
    acc += ore.prob;
    if (roll < acc) return ore;
  }
  return unlockedOres[0];
}

// Función para formatear números grandes
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Función para calcular el tiempo restante
export function getTimeRemaining(endTime: number): number {
  return Math.max(0, endTime - Date.now());
}

// Función para verificar si se puede desbloquear algo
export function canUnlock(requirement: { [key: string]: number }, data: any): boolean {
  return Object.entries(requirement).every(([key, value]) => 
    (data[key] || 0) >= value
  );
}

// Función para obtener minerales desbloqueados
export function getUnlockedOres(miningLevel: number) {
  const showIron = miningLevel >= 2;
  const showCopper = miningLevel >= 4;
  const showSilver = miningLevel >= 6;

  return [
    ORES[0], // gold siempre
    ORES[1], // stone siempre
    ...(showIron ? [ORES[2]] : []),
    ...(showCopper ? [ORES[3]] : []),
    ...(showSilver ? [ORES[4]] : []),
  ];
} 