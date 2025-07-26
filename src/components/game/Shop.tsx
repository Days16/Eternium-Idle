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
  const [cooldownBlacksmith, setCooldownBlacksmith] = React.useState(false);

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

  const buyBlacksmithUpgrade = () => {
    if (data.gold < 70 || cooldownBlacksmith || !data.unlocked.blacksmith) return;
    setCooldownBlacksmith(true);
    setData(prev => {
      const newUpgrades = { ...prev.upgrades, blacksmith: prev.upgrades.blacksmith + 1 };
      const newAchievements = [...prev.achievements];
      if (newUpgrades.blacksmith === 1 && !newAchievements.includes('ach_upgrade_blacksmith1')) {
        newAchievements.push('ach_upgrade_blacksmith1');
      }
      return {
        ...prev,
        gold: prev.gold - 70,
        upgrades: newUpgrades,
        achievements: newAchievements,
      };
    });
    setTimeout(() => setCooldownBlacksmith(false), 1000);
  };

  const upgradesList = [
    {
      key: 'mining',
      unlocked: true,
      cost: 50,
      cooldown: cooldownMining,
      onClick: buyMiningUpgrade,
      label: t('shop_mining', { level: data.upgrades.mining }),
      desc: t('desc_mining'),
      disabled: data.gold < 50 || cooldownMining,
    },
    {
      key: 'combat',
      unlocked: data.unlocked.combat,
      cost: 100,
      cooldown: cooldownCombat,
      onClick: buyCombatUpgrade,
      label: t('shop_combat', { level: data.upgrades.combat }),
      desc: t('desc_combat'),
      disabled: data.gold < 100 || cooldownCombat,
    },
    {
      key: 'cooking',
      unlocked: data.unlocked.cooking,
      cost: 80,
      cooldown: cooldownCooking,
      onClick: buyCookingUpgrade,
      label: t('shop_cooking', { level: data.upgrades.cooking }),
      desc: t('desc_cooking'),
      disabled: data.gold < 80 || cooldownCooking,
    },
    {
      key: 'exploration',
      unlocked: data.unlocked.exploration,
      cost: 120,
      cooldown: cooldownExploration,
      onClick: buyExplorationUpgrade,
      label: t('shop_exploration', { level: data.upgrades.exploration }),
      desc: t('desc_exploration'),
      disabled: data.gold < 120 || cooldownExploration,
    },
    {
      key: 'blacksmith',
      unlocked: data.unlocked.blacksmith,
      cost: 70,
      cooldown: cooldownBlacksmith,
      onClick: buyBlacksmithUpgrade,
      label: t('shop_blacksmith', { level: data.upgrades.blacksmith }),
      desc: t('desc_blacksmith'),
      disabled: data.gold < 70 || cooldownBlacksmith,
    },
  ];

  return (
    <div className="activity-section">
      <h2>{t('shop')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {upgradesList.filter(u => u.unlocked).map(upg => (
          <div key={upg.key} style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', boxShadow: '0 0 8px #18181833', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
            <div style={{ fontWeight: 'bold', fontSize: 17 }}>{upg.label}</div>
            <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>{upg.desc}</div>
            <button className="btn" onClick={upg.onClick} disabled={upg.disabled} style={{ minWidth: 120, background: '#232323', color: '#fff', borderRadius: 8, fontWeight: 600, opacity: upg.disabled ? 0.6 : 1 }}>
              {upg.cooldown ? t('loading') : t('upgrade')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop; 