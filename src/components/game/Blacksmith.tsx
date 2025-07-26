import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MineralsIcon from '../../assets/Minerals.png';
import { useGame } from './GameProvider';

const EQUIPMENT_LIST = [
  {
    key: 'sword',
    name: 'sword',
    cost: { gold: 20, stone: 10 },
    bonus: { atk: 3 },
    icon: '🗡️',
  },
  {
    key: 'armor',
    name: 'armor',
    cost: { gold: 30, stone: 20 },
    bonus: { def: 5 },
    icon: '🛡️',
  },
  {
    key: 'helmet',
    name: 'helmet',
    cost: { gold: 15, stone: 15 },
    bonus: { hp: 10 },
    icon: '⛑️',
  },
];

interface Equipment {
  sword: boolean;
  armor: boolean;
  helmet: boolean;
}

interface BlacksmithProps {
  mining: { gold: number; stone: number };
  equipment: Equipment;
  setMining: (data: { gold: number; stone: number }) => void;
  setEquipment: (eq: Equipment) => void;
}

const Blacksmith: React.FC<BlacksmithProps> = ({ mining, equipment, setMining, setEquipment }) => {
  const { t } = useTranslation();
  const { data, setData } = useGame();
  const [message, setMessage] = useState<string | null>(null);

  // Desbloqueo progresivo: 100 de hierro
  React.useEffect(() => {
    if (!data.unlocked.blacksmith && data.iron >= 100) {
      setData(prev => ({ ...prev, unlocked: { ...prev.unlocked, blacksmith: true } }));
    }
  }, [data.iron, data.unlocked.blacksmith, setData]);

  const unlocked = data.unlocked.blacksmith;

  const canForge = (item: typeof EQUIPMENT_LIST[0]) => {
    return (
      mining.gold >= item.cost.gold &&
      mining.stone >= item.cost.stone &&
      !equipment[item.key as keyof Equipment]
    );
  };

  const handleForge = (item: typeof EQUIPMENT_LIST[0]) => {
    if (!canForge(item)) {
      setMessage(t('not_enough_materials'));
      return;
    }
    setMining({
      gold: mining.gold - item.cost.gold,
      stone: mining.stone - item.cost.stone,
    });
    setEquipment({
      ...equipment,
      [item.key]: true,
    });
    setData(prev => {
      const alreadyAchieved = prev.achievements.includes(`ach_forge_${item.key}1`);
      return {
        ...prev,
        achievements: alreadyAchieved ? prev.achievements : [...prev.achievements, `ach_forge_${item.key}1`],
      };
    });
    setMessage(t('forged_success', { item: t(item.name) }));
  };

  return (
    <div className="activity-section">
      <h2>{t('blacksmith')}</h2>
      <img
        src={MineralsIcon}
        alt="Herrero"
        style={{ width: 64, height: 64, display: 'block', margin: '0 auto', borderRadius: 8 }}
      />
      {!unlocked ? (
        <div style={{ color: '#ffb347', marginTop: 8, textAlign: 'center', minHeight: 48 }}>
          {t('blacksmith_unlock_msg')}
        </div>
      ) : (
        <>
          <div style={{ margin: '1rem 0' }}>
            <strong>{t('inventory')}:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
              <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center'}}>
                <span style={{ fontSize: 28 }}>🪙</span>
                <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('gold')}</div>
                <div>{mining.gold}</div>
              </div>
              <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center'}}>
                <span style={{ fontSize: 28 }}>🪨</span>
                <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('stone')}</div>
                <div>{mining.stone}</div>
              </div>
            </div>
          </div>
          <div style={{ margin: '1.5rem 0 0.5rem 0' }}>
            <strong>{t('forge_equipment')}:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
              {EQUIPMENT_LIST.map(item => (
                <div key={item.key} className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 160, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t(item.name)}</div>
                  <div style={{ fontSize: 13, color: '#aaa', margin: '4px 0' }}>({Object.entries(item.bonus).map(([k, v]) => `+${v} ${k}`).join(', ')})</div>
                  {equipment[item.key as keyof Equipment] ? (
                    <span style={{ color: '#7fff7f', fontWeight: 600 }}>{t('equipped')}</span>
                  ) : (
                    <button
                      className="btn"
                      style={{ marginTop: 8, minWidth: 90, background: '#232323', color: '#fff', borderRadius: 8, fontWeight: 600, cursor: canForge(item) ? 'pointer' : 'not-allowed', opacity: canForge(item) ? 1 : 0.6 }}
                      disabled={!canForge(item)}
                      onClick={() => handleForge(item)}
                    >
                      {t('forge')}
                      <span style={{ fontSize: 12, marginLeft: 6 }}>
                        🪙{item.cost.gold} 🪨{item.cost.stone}
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ margin: '1.5rem 0 0.5rem 0' }}>
            <strong>{t('equipped_items')}:</strong>
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 10 }}>
              {EQUIPMENT_LIST.map(item => equipment[item.key as keyof Equipment] && (
                <span key={item.key} style={{ fontSize: 28 }} title={t(item.name)}>{item.icon}</span>
              ))}
              {!Object.values(equipment).some(Boolean) && <span style={{ color: '#aaa', fontSize: 15 }}>{t('no_equipment')}</span>}
            </div>
          </div>
          {message && <div style={{ color: '#ffd700', marginTop: 10, fontWeight: 600 }}>{message}</div>}
        </>
      )}
    </div>
  );
};

export default Blacksmith; 