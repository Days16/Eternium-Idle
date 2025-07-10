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
  ];

  useEffect(() => {
    const unlocked = ACHIEVEMENTS.filter(a => a.check(data) && !data.achievements.includes(a.id)).map(a => a.id);
    if (unlocked.length > 0) {
      setData(prev => ({ ...prev, achievements: [...prev.achievements, ...unlocked] }));
    }
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