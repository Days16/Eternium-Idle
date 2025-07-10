import React, { useState } from 'react';
import { useGame } from '../GameProvider';
import { useTranslation } from 'react-i18next';

const Exploration: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();
  const [msg, setMsg] = useState('');
  const unlocked = data.unlocked.exploration;

  const explore = () => {
    if (!unlocked) return;
    const roll = Math.random();
    if (roll < 0.5) {
      setMsg(t('nothing_found'));
      setData(prev => ({
        ...prev,
        stats: { ...prev.stats, explorations: prev.stats.explorations + 1 },
      }));
    } else if (roll < 0.8) {
      setMsg(t('found_gold'));
      setData(prev => ({
        ...prev,
        gold: prev.gold + 10,
        stats: { ...prev.stats, explorations: prev.stats.explorations + 1 },
      }));
    } else {
      setMsg(t('found_gem'));
      setData(prev => ({
        ...prev,
        gems: prev.gems + 1,
        stats: { ...prev.stats, explorations: prev.stats.explorations + 1 },
      }));
    }
  };

  return (
    <div className="activity-section">
      <h2>{t('exploration')}</h2>
      <div style={{ width: 64, height: 64, background: 'teal', margin: '0 auto', borderRadius: 8 }} />
      {unlocked ? (
        <>
          <button className="btn" onClick={explore}>{t('explore')}</button>
          <p>{t('gems')}: {data.gems}</p>
        </>
      ) : (
        <div style={{ color: '#ffb347', marginTop: 8 }}>{t('exploration_unlock_msg')}</div>
      )}
      
      {msg && <div style={{ color: '#f5b942', marginTop: 8 }}>{msg}</div>}
    </div>
  );
};

export default Exploration; 