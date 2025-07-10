import React, { useState } from 'react';
import { useGame } from '../GameProvider';
import { useTranslation } from 'react-i18next';

const getRandomEnemy = (t: any) => {
  const enemies = [
    { name: t('goblin'), hp: 10, atk: 2, reward: 10 },
    { name: t('orc'), hp: 20, atk: 4, reward: 20 },
    { name: t('troll_boss'), hp: 50, atk: 8, reward: 50 },
  ];
  return enemies[Math.floor(Math.random() * enemies.length)];
};

const Combat: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();
  const [enemy, setEnemy] = useState<any | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [fighting, setFighting] = useState(false);

  const unlocked = data.unlocked.combat;

  const startCombat = () => {
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
      setLog(l => [...l, t('combat_player_attack', { turn, enemy: e.name, hp: Math.max(enemyHp, 0) })]);
      if (enemyHp <= 0) {
        setLog(l => [...l, t('combat_win', { enemy: e.name, reward: e.reward })]);
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
      setLog(l => [...l, t('combat_enemy_attack', { turn, enemy: e.name, hp: Math.max(playerHp, 0) })]);
      if (playerHp <= 0) {
        setLog(l => [...l, t('combat_lose', { enemy: e.name })]);
        setFighting(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="activity-section">
      <h2>{t('combat')}</h2>
      <div style={{ width: 64, height: 64, background: 'crimson', margin: '0 auto', borderRadius: 8 }} />
      {unlocked ? (
        <button className="btn" onClick={startCombat} disabled={fighting}>
          {fighting ? t('fighting') : t('fight')}
        </button>
      ) : (
        <div style={{ color: '#ffb347', marginTop: 8 }}>{t('combat_unlock_msg')}</div>
      )}
      <div style={{ textAlign: 'left', marginTop: 12, minHeight: 60 }}>
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
};

export default Combat; 