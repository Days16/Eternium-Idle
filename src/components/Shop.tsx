import React from 'react';
import { useGame } from './GameProvider';
import { useTranslation } from 'react-i18next';

const Shop: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();

  const buyMiningUpgrade = () => {
    if (data.gold < 50) return;
    setData(prev => ({
      ...prev,
      gold: prev.gold - 50,
      upgrades: { ...prev.upgrades, mining: prev.upgrades.mining + 1 },
    }));
  };

  const buyCombatUpgrade = () => {
    if (data.gold < 100) return;
    setData(prev => ({
      ...prev,
      gold: prev.gold - 100,
      upgrades: { ...prev.upgrades, combat: prev.upgrades.combat + 1 },
    }));
  };

  return (
    <div className="activity-section">
      <h2>{t('shop')}</h2>
      <div>
        <button className="btn" onClick={buyMiningUpgrade} disabled={data.gold < 50}>
          {t('shop_mining', { level: data.upgrades.mining })}
        </button>
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={buyCombatUpgrade} disabled={data.gold < 100}>
          {t('shop_combat', { level: data.upgrades.combat })}
        </button>
      </div>
    </div>
  );
};

export default Shop; 