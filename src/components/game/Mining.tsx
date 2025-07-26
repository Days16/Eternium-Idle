import React, { useState } from 'react';
import { useGame } from '../game/GameProvider';
import { useTranslation } from 'react-i18next';

const ORES = [
  { key: 'gold', label: 'gold', emoji: '🪙', prob: 0.25 },
  { key: 'stone', label: 'stone', emoji: '🪨', prob: 0.35 },
  { key: 'iron', label: 'iron', emoji: '⛓️', prob: 0.18 },
  { key: 'copper', label: 'copper', emoji: '🥉', prob: 0.12 },
  { key: 'silver', label: 'silver', emoji: '🥈', prob: 0.10 },
];

function getRandomOre(unlockedOres: typeof ORES) {
  const roll = Math.random();
  let acc = 0;
  for (const ore of unlockedOres) {
    acc += ore.prob;
    if (roll < acc) return ore;
  }
  return unlockedOres[0];
}

const Mining: React.FC = () => {
  const { data, setData } = useGame();
  const { t } = useTranslation();
  const [lastMined, setLastMined] = useState<string | null>(null);
  // Desbloqueo progresivo de minerales por nivel de mejora
  const showIron = data.upgrades.mining >= 2; // Hierro desde mejora 2
  const showCopper = data.upgrades.mining >= 4; // Cobre desde mejora 4
  const showSilver = data.upgrades.mining >= 6; // Plata desde mejora 6

  // Solo minar ores desbloqueados
  const unlockedOres = [
    ORES[0], // gold siempre
    ORES[1], // stone siempre
    ...(showIron ? [ORES[2]] : []),
    ...(showCopper ? [ORES[3]] : []),
    ...(showSilver ? [ORES[4]] : []),
  ];

  // Eliminar función de minado aleatorio y crear una por mineral
  const handleMineOre = (oreKey: string) => {
    setData(prev => ({
      ...prev,
      [oreKey]: (prev as any)[oreKey] + 1,
    }));
    setLastMined(oreKey);
  };

  // Desbloqueos progresivos (igual que antes)
  React.useEffect(() => {
    setData(prev => {
      let newData = { ...prev };
      if (!newData.unlocked.combat && newData.gold >= 100) newData.unlocked.combat = true;
      if (!newData.unlocked.cooking && newData.stone >= 100) newData.unlocked.cooking = true;
      if (!newData.unlocked.exploration && newData.gold >= 200 && newData.stone >= 200) newData.unlocked.exploration = true;
      return newData;
    });
  }, [data.gold, data.stone]);

  return (
    <div className="activity-section">
      <h2>{t('mining')}</h2>
      {lastMined && <div style={{ color: '#f5b942', marginBottom: 8 }}>{t('you_mined', { ore: t(lastMined) })}</div>}
      <div style={{ margin: '1rem 0' }}>
        <strong>{t('inventory')}:</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
          {/* Oro */}
          <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center', boxShadow: '0 0 8px #18181833' }}>
            <span style={{ fontSize: 28 }}>{ORES[0].emoji}</span>
            <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('gold')}</div>
            <div>{data.gold}</div>
            <button className="btn" style={{ marginTop: 8 }} onClick={() => handleMineOre('gold')}>{t('mine')}</button>
          </div>
          {/* Piedra */}
          <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center', boxShadow: '0 0 8px #18181833' }}>
            <span style={{ fontSize: 28 }}>{ORES[1].emoji}</span>
            <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('stone')}</div>
            <div>{data.stone}</div>
            <button className="btn" style={{ marginTop: 8 }} onClick={() => handleMineOre('stone')}>{t('mine')}</button>
          </div>
          {/* Hierro */}
          <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center', boxShadow: '0 0 8px #18181833', color: showIron ? undefined : '#ffb347' }}>
            <span style={{ fontSize: 28 }}>{ORES[2].emoji}</span>
            <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('iron')}</div>
            <div>{showIron ? data.iron : t('iron_unlock_msg')}</div>
            {showIron && (
              <button className="btn" style={{ marginTop: 8 }} onClick={() => handleMineOre('iron')}>{t('mine')}</button>
            )}
          </div>
          {/* Cobre */}
          <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center', boxShadow: '0 0 8px #18181833', color: showCopper ? undefined : '#ffb347' }}>
            <span style={{ fontSize: 28 }}>{ORES[3].emoji}</span>
            <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('copper')}</div>
            <div>{showCopper ? data.copper : t('copper_unlock_msg')}</div>
            {showCopper && (
              <button className="btn" style={{ marginTop: 8 }} onClick={() => handleMineOre('copper')}>{t('mine')}</button>
            )}
          </div>
          {/* Plata */}
          <div className="ore-container" style={{ background: '#232323', borderRadius: 12, padding: '1rem 1.2rem', minWidth: 120, textAlign: 'center', boxShadow: '0 0 8px #18181833', color: showSilver ? undefined : '#ffb347' }}>
            <span style={{ fontSize: 28 }}>{ORES[4].emoji}</span>
            <div style={{ fontWeight: 'bold', marginTop: 4 }}>{t('silver')}</div>
            <div>{showSilver ? data.silver : t('silver_unlock_msg')}</div>
            {showSilver && (
              <button className="btn" style={{ marginTop: 8 }} onClick={() => handleMineOre('silver')}>{t('mine')}</button>
            )}
          </div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: '#aaa' }}>{t('mining_auto')}</p>
    </div>
  );
};

export default Mining; 