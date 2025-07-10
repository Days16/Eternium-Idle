import React from 'react';
import { useGame } from './GameProvider';
import { useTranslation } from 'react-i18next';

const Shop: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();

  const [cooldownMining, setCooldownMining] = React.useState(false);
  const [cooldownCombat, setCooldownCombat] = React.useState(false);
  const [cooldownCooking, setCooldownCooking] = React.useState(false);
  const [cooldownExploration, setCooldownExploration] = React.useState(false);

  const buyMiningUpgrade = () => {
    if (data.gold < 50 || cooldownMining) return;
    setCooldownMining(true);
    setData(prev => {
      const newUpgrades = { ...prev.upgrades, mining: prev.upgrades.mining + 1 };
      const newAchievements = [...prev.achievements];
      if (newUpgrades.mining === 1 && !newAchievements.includes('ach_upgrade_mining1')) {
        newAchievements.push('ach_upgrade_mining1');
      }
      return {
        ...prev,
        gold: prev.gold - 50,
        upgrades: newUpgrades,
        achievements: newAchievements,
      };
    });
    setTimeout(() => setCooldownMining(false), 1000);
  };

  const buyCombatUpgrade = () => {
    if (data.gold < 100 || cooldownCombat) return;
    setCooldownCombat(true);
    setData(prev => {
      const newUpgrades = { ...prev.upgrades, combat: prev.upgrades.combat + 1 };
      const newAchievements = [...prev.achievements];
      if (newUpgrades.combat === 1 && !newAchievements.includes('ach_upgrade_combat1')) {
        newAchievements.push('ach_upgrade_combat1');
      }
      return {
        ...prev,
        gold: prev.gold - 100,
        upgrades: newUpgrades,
        achievements: newAchievements,
      };
    });
    setTimeout(() => setCooldownCombat(false), 1000);
  };

  const buyCookingUpgrade = () => {
    if (data.gold < 80 || cooldownCooking || !data.unlocked.cooking) return;
    setCooldownCooking(true);
    setData(prev => {
      const newUpgrades = { ...prev.upgrades, cooking: prev.upgrades.cooking + 1 };
      const newAchievements = [...prev.achievements];
      if (newUpgrades.cooking === 1 && !newAchievements.includes('ach_upgrade_cooking1')) {
        newAchievements.push('ach_upgrade_cooking1');
      }
      return {
        ...prev,
        gold: prev.gold - 80,
        upgrades: newUpgrades,
        achievements: newAchievements,
      };
    });
    setTimeout(() => setCooldownCooking(false), 1000);
  };

  const buyExplorationUpgrade = () => {
    if (data.gold < 120 || cooldownExploration || !data.unlocked.exploration) return;
    setCooldownExploration(true);
    setData(prev => {
      const newUpgrades = { ...prev.upgrades, exploration: prev.upgrades.exploration + 1 };
      const newAchievements = [...prev.achievements];
      if (newUpgrades.exploration === 1 && !newAchievements.includes('ach_upgrade_exploration1')) {
        newAchievements.push('ach_upgrade_exploration1');
      }
      return {
        ...prev,
        gold: prev.gold - 120,
        upgrades: newUpgrades,
        achievements: newAchievements,
      };
    });
    setTimeout(() => setCooldownExploration(false), 1000);
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
      {data.unlocked.cooking && (
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={buyCookingUpgrade} disabled={data.gold < 80 || cooldownCooking}>
            {cooldownCooking ? t('loading') : t('shop_cooking', { level: data.upgrades.cooking })}
          </button>
        </div>
      )}
      {data.unlocked.exploration && (
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={buyExplorationUpgrade} disabled={data.gold < 120 || cooldownExploration}>
            {cooldownExploration ? t('loading') : t('shop_exploration', { level: data.upgrades.exploration })}
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop; 