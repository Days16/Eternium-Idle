import React from 'react';
import { useGame } from './GameProvider';
import { useTranslation } from 'react-i18next';

const Shop: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();

  const [cooldownMining, setCooldownMining] = React.useState(false);
  const [cooldownCombat, setCooldownCombat] = React.useState(false);

  const buyMiningUpgrade = () => {
    if (data.gold < 50 || cooldownMining) return;
    setCooldownMining(true);
    setData(prev => ({
      ...prev,
      gold: prev.gold - 50,
      upgrades: { ...prev.upgrades, mining: prev.upgrades.mining + 1 },
    }));
    setTimeout(() => setCooldownMining(false), 1000);
  };

  const buyCombatUpgrade = () => {
    if (data.gold < 100 || cooldownCombat) return;
    setCooldownCombat(true);
    setData(prev => ({
      ...prev,
      gold: prev.gold - 100,
      upgrades: { ...prev.upgrades, combat: prev.upgrades.combat + 1 },
    }));
    setTimeout(() => setCooldownCombat(false), 1000);
  };

  return (
    <div className="activity-section">
      <h2>{t('shop')}</h2>
      <div>
        <button className="btn" onClick={buyMiningUpgrade} disabled={data.gold < 50 || cooldownMining}>
          {cooldownMining ? t('loading') : t('shop_mining', { level: data.upgrades.mining })}
        </button>
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={buyCombatUpgrade} disabled={data.gold < 100 || cooldownCombat}>
          {cooldownCombat ? t('loading') : t('shop_combat', { level: data.upgrades.combat })}
        </button>
      </div>
    </div>
  );
};

export default Shop; 