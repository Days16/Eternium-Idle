import React, { useState } from 'react';
import { useGame } from '../GameProvider';
import { useTranslation } from 'react-i18next';

const ORES = [
  { key: 'gold', label: 'gold', emoji: '🪙', prob: 0.25 },
  { key: 'stone', label: 'stone', emoji: '🪨', prob: 0.35 },
  { key: 'iron', label: 'iron', emoji: '⛓️', prob: 0.18 },
  { key: 'copper', label: 'copper', emoji: '🥉', prob: 0.12 },
  { key: 'silver', label: 'silver', emoji: '🥈', prob: 0.10 },
];

function getRandomOre() {
  const roll = Math.random();
  let acc = 0;
  for (const ore of ORES) {
    acc += ore.prob;
    if (roll < acc) return ore;
  }
  return ORES[0];
}

const Mining: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();
  const [lastMined, setLastMined] = useState<string | null>(null);

  const handleMine = () => {
    const ore = getRandomOre();
    setData(prev => ({
      ...prev,
      [ore.key]: (prev as any)[ore.key] + 1,
    }));
    setLastMined(ore.key);
  };

  // Desbloqueo progresivo de minerales
  const showIron = data.stone >= 30;
  const showCopper = data.stone >= 60;
  const showSilver = data.stone >= 100;

  // Desbloqueos progresivos (igual que antes)
  React.useEffect(() => {
    setData(prev => {
      let newData = { ...prev };
      if (!newData.unlocked.combat && newData.gold >= 100) newData.unlocked.combat = true;
      if (!newData.unlocked.cooking && newData.stone >= 100) newData.unlocked.cooking = true;
      if (!newData.unlocked.exploration && newData.gold >= 200 && newData.stone >= 200) newData.unlocked.exploration = true;
      return newData;
    });
    // eslint-disable-next-line
  }, [data.gold, data.stone]);

  return (
    <div className="activity-section">
      <h2>{t('mining')}</h2>
      <button className="btn" style={{ fontSize: 22, margin: '1rem 0' }} onClick={handleMine}>{t('mine')}</button>
      {lastMined && <div style={{ color: '#f5b942', marginBottom: 8 }}>{t('you_mined', { ore: t(lastMined) })}</div>}
      <div style={{ margin: '1rem 0' }}>
        <strong>{t('inventory')}:</strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ display: 'inline-block', marginRight: 16 }}>
            <span style={{ fontSize: 22 }}>🪙</span> {t('gold')}: {data.gold}
          </li>
          <li style={{ display: 'inline-block', marginRight: 16 }}>
            <span style={{ fontSize: 22 }}>🪨</span> {t('stone')}: {data.stone}
          </li>
          {showIron ? (
            <li style={{ display: 'inline-block', marginRight: 16 }}>
              <span style={{ fontSize: 22 }}>⛓️</span> {t('iron')}: {data.iron}
            </li>
          ) : (
            <li style={{ display: 'inline-block', marginRight: 16, color: '#ffb347' }}>{t('iron_unlock_msg')}</li>
          )}
          {showCopper ? (
            <li style={{ display: 'inline-block', marginRight: 16 }}>
              <span style={{ fontSize: 22 }}>🥉</span> {t('copper')}: {data.copper}
            </li>
          ) : (
            <li style={{ display: 'inline-block', marginRight: 16, color: '#ffb347' }}>{t('copper_unlock_msg')}</li>
          )}
          {showSilver ? (
            <li style={{ display: 'inline-block', marginRight: 16 }}>
              <span style={{ fontSize: 22 }}>🥈</span> {t('silver')}: {data.silver}
            </li>
          ) : (
            <li style={{ display: 'inline-block', marginRight: 16, color: '#ffb347' }}>{t('silver_unlock_msg')}</li>
          )}
        </ul>
      </div>
      <p style={{ fontSize: 12, color: '#aaa' }}>{t('mining_auto')}</p>
    </div>
  );
};

export default Mining; 