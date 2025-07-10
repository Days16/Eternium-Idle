import React, { useState } from 'react';
import { useGame } from '../GameProvider';
import { useTranslation } from 'react-i18next';

const Cooking: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();
  const [msg, setMsg] = useState('');
  // Eliminar cooldown
  const [cooldown, setCooldown] = useState(false);

  const unlocked = data.unlocked.cooking;

  const cookBread = () => {
    if (!unlocked) return;
    if (data.stone < 10) {
      setMsg(t('not_enough_stone'));
      return;
    }
    setData(prev => ({
      ...prev,
      stone: prev.stone - 10,
      food: prev.food + 1,
      stats: { ...prev.stats, recipesCooked: prev.stats.recipesCooked + 1 },
    }));
    setMsg(t('bread_cooked'));
  };

  return (
    <div className="activity-section">
      <h2>{t('cooking')}</h2>
      <div style={{ width: 64, height: 64, background: 'saddlebrown', margin: '0 auto', borderRadius: 8 }} />
      <p>{t('recipe_bread')}</p>
      {unlocked ? (
        <button className="btn" onClick={cookBread}>{t('cook_bread')}</button>
      ) : (
        <div style={{ color: '#ffb347', marginTop: 8 }}>{t('cooking_unlock_msg')}</div>
      )}
      <p>{t('food_count')}: {data.food}</p>
      {msg && <div style={{ color: '#f5b942', marginTop: 8 }}>{msg}</div>}
    </div>
  );
};

export default Cooking; 