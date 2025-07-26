import React, { useState } from 'react';
import { useGame } from './GameProvider';
import { useTranslation } from 'react-i18next';
import BreadIcon from '../../assets/Bread.png';

const FOODS = [
  {
    key: 'bread',
    label: 'bread',
    emoji: '🍞',
    cost: { herbs: 2, stone: 10 },
    bonus: '+2 vida',
  },
  {
    key: 'soup',
    label: 'soup',
    emoji: '🥣',
    cost: { herbs: 4, gold: 5, food: 5 },
    bonus: '+1 defensa',
  },
  {
    key: 'stew',
    label: 'stew',
    emoji: '🍲',
    cost: { herbs: 6, gold: 10, stone: 5, food: 10 },
    bonus: '+2 ataque',
  },
  {
    key: 'pie',
    label: 'pie',
    emoji: '🥧',
    cost: { herbs: 10, gold: 20, food: 15 },
    bonus: '+5 vida',
  },
];

const Cooking: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();
  const [message, setMessage] = useState<string | null>(null);

  // Desbloqueo progresivo: 100 de piedra
  React.useEffect(() => {
    if (!data.unlocked.cooking && data.stone >= 100) {
      setData(prev => ({ ...prev, unlocked: { ...prev.unlocked, cooking: true } }));
    }
  }, [data.stone, data.unlocked.cooking, setData]);

  const unlocked = data.unlocked.cooking;

  const canCook = (food: typeof FOODS[0]) => {
    const { gold = 0, stone = 0, food: foodRes = 0, herbs = 0 } = food.cost;
    return (
      data.gold >= (gold || 0) &&
      data.stone >= (stone || 0) &&
      data.food >= (foodRes || 0) &&
      data.herbs >= (herbs || 0)
    );
  };

  const handleCook = (food: typeof FOODS[0]) => {
    if (!canCook(food)) {
      setMessage(t('not_enough_materials'));
      return;
    }
    setData(prev => {
      const alreadyAchieved = prev.achievements.includes(`ach_cook_${food.key}1`);
      return {
        ...prev,
        gold: prev.gold - (food.cost.gold || 0),
        stone: prev.stone - (food.cost.stone || 0),
        food: prev.food - (food.cost.food || 0),
        herbs: prev.herbs - (food.cost.herbs || 0),
        foods: {
          ...prev.foods,
          [food.key as keyof typeof prev.foods]: prev.foods[food.key as keyof typeof prev.foods] + 1,
        },
        stats: {
          ...prev.stats,
          recipesCooked: prev.stats.recipesCooked + 1,
        },
        achievements: alreadyAchieved ? prev.achievements : [...prev.achievements, `ach_cook_${food.key}1`],
      };
    });
    setMessage(t('cooked_success', { item: t(food.label) }));
  };

  return (
    <div className="activity-section">
      <h2>{t('cooking')}</h2>
      <img
        src={BreadIcon}
        alt="cocina"
        style={{ width: 64, height: 64, display: 'block', margin: '0 auto', borderRadius: 8 }}
      />
      {!unlocked ? (
        <div style={{ color: '#ffb347', marginTop: 8, textAlign: 'center', minHeight: 48 }}>
          {t('cooking_unlock_msg')}
        </div>
      ) : (
        <>
          <div style={{ margin: '1rem 0' }}>
            <strong>{t('inventory')}:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
              <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center'}}>
                <span style={{ fontSize: 28 }}>🌿</span>
                <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('herbs')}</div>
                <div>{data.herbs}</div>
              </div>
              {FOODS.map(food => (
                <div key={food.key} className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center' }}>
                  <span style={{ fontSize: 28 }}>{food.emoji}</span>
                  <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t(food.label)}</div>
                  <div>{data.foods[food.key as keyof typeof data.foods]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ margin: '1.5rem 0 0.5rem 0' }}>
            <strong>{t('cook_food')}:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
              {FOODS.map(food => (
                <div key={food.key} className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 160, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 28 }}>{food.emoji}</span>
                  <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t(food.label)}</div>
                  <div style={{ fontSize: 13, color: '#aaa', margin: '4px 0' }}>{food.bonus}</div>
                  <div style={{ fontSize: 12, color: '#ffd700', margin: '4px 0' }}>
                    {Object.entries(food.cost).map(([k, v]) => `${t(k)}: ${v}`).join(' | ')}
                  </div>
                  <button
                    className="btn"
                    style={{ marginTop: 8, minWidth: 90, background: '#232323', color: '#fff', borderRadius: 8, fontWeight: 600, cursor: canCook(food) ? 'pointer' : 'not-allowed', opacity: canCook(food) ? 1 : 0.6 }}
                    disabled={!canCook(food)}
                    onClick={() => handleCook(food)}
                  >
                    {t('cook')}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {message && <div style={{ color: '#ffd700', marginTop: 10, fontWeight: 600 }}>{message}</div>}
        </>
      )}
    </div>
  );
};

export default Cooking; 