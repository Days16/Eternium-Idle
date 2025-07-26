import React, { useEffect } from 'react';
import { useGame } from './GameProvider';
import { useTranslation } from 'react-i18next';

const Achievements: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();

  const ACHIEVEMENTS = [
    { id: 'gold100', text: t('ach_gold100'), check: (data: any) => data.gold >= 100 },
    { id: 'stone100', text: t('ach_stone100'), check: (data: any) => data.stone >= 100 },
    { id: 'combat1', text: t('ach_combat1'), check: (data: any) => data.stats.combatsWon >= 1 },
    { id: 'cook1', text: t('ach_cook1'), check: (data: any) => data.stats.recipesCooked >= 1 },
    { id: 'explore1', text: t('ach_explore1'), check: (data: any) => data.stats.explorations >= 1 },
    { id: 'ach_upgrade_mining1', text: t('ach_upgrade_mining1'), check: (data: any) => data.upgrades.mining >= 1 },
    { id: 'ach_upgrade_combat1', text: t('ach_upgrade_combat1'), check: (data: any) => data.upgrades.combat >= 1 },
    { id: 'ach_upgrade_cooking1', text: t('ach_upgrade_cooking1'), check: (data: any) => data.upgrades.cooking >= 1 },
    { id: 'ach_upgrade_exploration1', text: t('ach_upgrade_exploration1'), check: (data: any) => data.upgrades.exploration >= 1 },
    { id: 'ach_upgrade_blacksmith1', text: t('ach_upgrade_blacksmith1'), check: (data: any) => data.upgrades.blacksmith >= 1 },
    { id: 'ach_cook_bread1', text: t('ach_cook_bread1'), check: (data: any) => data.foods.bread >= 1 },
    { id: 'ach_cook_soup1', text: t('ach_cook_soup1'), check: (data: any) => data.foods.soup >= 1 },
    { id: 'ach_cook_stew1', text: t('ach_cook_stew1'), check: (data: any) => data.foods.stew >= 1 },
    { id: 'ach_cook_pie1', text: t('ach_cook_pie1'), check: (data: any) => data.foods.pie >= 1 },
    { id: 'ach_forge_sword1', text: t('ach_forge_sword1'), check: (data: any) => data.equipment.sword },
    { id: 'ach_forge_armor1', text: t('ach_forge_armor1'), check: (data: any) => data.equipment.armor },
    { id: 'ach_forge_helmet1', text: t('ach_forge_helmet1'), check: (data: any) => data.equipment.helmet },
  ];

  useEffect(() => {
    // Solo añade logros nuevos, nunca elimina los ya conseguidos
    const unlocked = ACHIEVEMENTS.filter(a => a.check(data) && !data.achievements.includes(a.id)).map(a => a.id);
    if (unlocked.length > 0) {
      setData(prev => ({ ...prev, achievements: [...prev.achievements, ...unlocked] }));
    }
    // No eliminamos logros aunque los requisitos ya no se cumplan
  }, [data, setData]);

  return (
    <div className="activity-section">
      <h2>{t('achievements')}</h2>
      <ul style={{ textAlign: 'left' }}>
        {ACHIEVEMENTS.map(a => (
          <li key={a.id} style={{ color: data.achievements.includes(a.id) ? '#4caf50' : '#aaa' }}>
            {a.text} {data.achievements.includes(a.id) && '✔️'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements; 