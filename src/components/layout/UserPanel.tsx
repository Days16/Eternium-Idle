import React, { useState } from 'react';
import { useGame } from '../game/GameProvider';
import { useTranslation } from 'react-i18next';
import { auth } from '../../services/firebaseConfig';
import { signOut } from 'firebase/auth';
import { defaultGameData } from '../../types/GameData';

const UserPanel: React.FC<{ setUser?: (user: any) => void, unlockAll?: () => void, alert?: string | null }> = ({ setUser, unlockAll, alert }) => {
  const { data, user, setData } = useGame();
  const { t } = useTranslation();
  const [cooldownLogout, setCooldownLogout] = useState(false);
  const [cooldownReset, setCooldownReset] = useState(false);

  const handleLogout = async () => {
    setCooldownLogout(true);
    await signOut(auth);
    if (setUser) setUser(null);
    setTimeout(() => setCooldownLogout(false), 1000);
  };

  // Botón para resetear perfil
  const handleReset = () => {
    setCooldownReset(true);
    setData({ ...defaultGameData });
    setTimeout(() => setCooldownReset(false), 1000);
  };

  return (
    <div className="activity-section">
      {alert && <div style={{marginBottom:12, background:'#232323', color:'#e0e0e0', borderRadius:8, padding:'0.5em 1em'}}>{alert}</div>}
      <h2>{t('panel_user')}</h2>
      <p>{t('email')}: {user?.email}</p>
      <p>{t('gold')}: {data.gold} | {t('stone')}: {data.stone} | {t('iron')}: {data.iron} | {t('copper')}: {data.copper} | {t('silver')}: {data.silver}</p>
      <p>{t('combats_won')}: {data.stats.combatsWon}</p>
      <p>{t('recipes_cooked')}: {data.stats.recipesCooked}</p>
      <p>{t('explorations')}: {data.stats.explorations}</p>
      <p>{t('achievements_count')}: {data.achievements.length}</p>
      <button className="btn" style={{ marginTop: 16 }} onClick={handleLogout} disabled={cooldownLogout}>{cooldownLogout ? t('loading') : t('logout')}</button>
      <button className="btn" style={{ marginTop: 16, marginLeft: 8, background: '#FF0000' }} onClick={handleReset} disabled={cooldownReset}>{cooldownReset ? t('loading') : t('reset_profile')}</button>
    </div>
  );
};

export default UserPanel; 