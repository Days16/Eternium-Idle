import React, { useState, useCallback } from 'react';
import { useGame } from './GameProvider';
import { useTranslation } from 'react-i18next';
import SkullIcon from '../../assets/Skull.png';

// Tipado para el enemigo
interface Enemy {
  name: string;
  hp: number;
  atk: number;
  reward: number;
}

// Función auxiliar para obtener un enemigo aleatorio
const getRandomEnemy = (t: any): Enemy => {
  const enemies: Enemy[] = [
    { name: t('goblin'), hp: 10, atk: 2, reward: 10 },
    { name: t('orc'), hp: 20, atk: 4, reward: 20 },
    { name: t('troll_boss'), hp: 50, atk: 8, reward: 50 },
  ];
  return enemies[Math.floor(Math.random() * enemies.length)];
};

const Combat: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [fighting, setFighting] = useState(false);

  const unlocked = data.unlocked.combat;

  // Función para iniciar el combate
  const startCombat = useCallback(() => {
    if (!unlocked || fighting) return;
    const e = getRandomEnemy(t);
    setEnemy({ ...e });
    setLog([t('combat_start', { enemy: e.name })]);
    setFighting(true);
    let playerHp = 30 + data.combatLevel * 5;
    let enemyHp = e.hp;
    let turn = 0;
    const interval = setInterval(() => {
      turn++;
      // Jugador ataca
      enemyHp -= 5 + data.combatLevel * 2;
      setLog(l => [
        ...l,
        t('combat_player_attack', { turn, enemy: e.name, hp: Math.max(enemyHp, 0) })
      ]);
      if (enemyHp <= 0) {
        setLog(l => [
          ...l,
          t('combat_win', { enemy: e.name, reward: e.reward })
        ]);
        setData(prev => ({
          ...prev,
          gold: prev.gold + e.reward,
          stats: { ...prev.stats, combatsWon: prev.stats.combatsWon + 1 },
        }));
        setFighting(false);
        clearInterval(interval);
        return;
      }
      // Enemigo ataca
      playerHp -= e.atk;
      setLog(l => [
        ...l,
        t('combat_enemy_attack', { turn, enemy: e.name, hp: Math.max(playerHp, 0) })
      ]);
      if (playerHp <= 0) {
        setLog(l => [
          ...l,
          t('combat_lose', { enemy: e.name })
        ]);
        setFighting(false);
        clearInterval(interval);
      }
    }, 1000);
  }, [unlocked, fighting, t, data.combatLevel, setData]);

  // Renderizado del log
  const renderLog = useCallback(() => (
    log.map((l, i) => <div key={i}>{l}</div>)
  ), [log]);

  return (
    <div className="activity-section">
      <h2>{t('combat')}</h2>
      <img
        src={SkullIcon}
        alt="skull"
        style={{ width: 64, height: 64, display: 'block', margin: '0 auto', borderRadius: 8 }}
      />
      <div style={{ minHeight: 48, marginTop: 8 }}>
        {unlocked ? (
          <button
            className="btn"
            onClick={startCombat}
            disabled={fighting}
          >
            {fighting ? t('fighting') : t('fight')}
          </button>
        ) : (
          <div style={{ color: '#ffb347', textAlign: 'center' }}>
            {t('combat_unlock_msg')}
          </div>
        )}
      </div>
      <div style={{ textAlign: 'left', marginTop: 12, minHeight: 60 }}>
        {renderLog()}
      </div>
    </div>
  );
};

export default Combat; 