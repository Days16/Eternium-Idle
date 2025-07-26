import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/App.css';
import Auth from './components/ui/Auth';
import { auth } from './services/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LanguageSwitcher from './components/ui/LanguageSwitcher';
import { GameProvider, useGame } from './components/game/GameProvider';
import Mining from './components/game/Mining';
import Combat from './components/game/Combat';
import Cooking from './components/game/Cooking';
import Exploration from './components/game/Exploration';
import Shop from './components/game/Shop';
import Achievements from './components/game/Achievements';
import UserPanel from './components/layout/UserPanel';
import Blacksmith from './components/game/Blacksmith';

function GoldBar() {
  const { data } = useGame();
  const { t } = useTranslation();
  return (
    <div className="gold-bar">
      <span className="gold-icon">🪙</span> {t('gold')}: {data.gold}
      <span className="gold-icon">🪨</span> {t('stone')}: {data.stone}
      <span className="gold-icon">⛓️</span> {t('iron')}: {data.iron}
      <span className="gold-icon">🥉</span> {t('copper')}: {data.copper}
      <span className="gold-icon">🥈</span> {t('silver')}: {data.silver}
    </div>
  );
}

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState('mining');

  // Añadir función de logout global
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if (!user) {
    return (
      <div className="App">
        <LanguageSwitcher />
        <h1>{t('welcome')}</h1>
        <Auth onAuth={setUser} user={user} />
      </div>
    );
  }

  // Render dentro de GameProvider para poder usar useGame
  return (
    <GameProvider user={user}>
      <GameUI user={user} setUser={setUser} tab={tab} setTab={setTab} t={t} handleLogout={handleLogout} />
    </GameProvider>
  );
}

// Nuevo componente para la UI principal, aquí sí se puede usar useGame
function GameUI({ user, setUser, tab, setTab, t, handleLogout }: any) {
  const { setData, data } = useGame();
  const [alert, setAlert] = useState<string | null>(null);

  // Mostrar alertas temporales
  const showAlert = (msg: string) => {
    setAlert(msg);
    setTimeout(() => setAlert(null), 3000);
  };

  // Quitar cooldown de tabs
  const handleTab = (tabName: string) => {
    setTab(tabName);
  };

  return (
    <div className="App">
      {alert && <div style={{position:'fixed',top:10,left:0,right:0,zIndex:1000,textAlign:'center'}}><div className="activity-section" style={{background:'#232323',color:'#e0e0e0',margin:'0 auto',maxWidth:340}}>{alert}</div></div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <GoldBar />
        <div>
          <LanguageSwitcher />
        </div>
      </div>
      <h1>{t('welcome')}</h1>
      <div className="tabs">
        <button className={tab === 'mining' ? 'active' : ''} onClick={() => handleTab('mining')}>{t('mining')}</button>
        <button className={tab === 'combat' ? 'active' : ''} onClick={() => handleTab('combat')}>{t('combat')}</button>
        <button className={tab === 'blacksmith' ? 'active' : ''} onClick={() => handleTab('blacksmith')}>{t('blacksmith') || 'Herrero'}</button>
        <button className={tab === 'cooking' ? 'active' : ''} onClick={() => handleTab('cooking')}>{t('cooking')}</button>
        <button className={tab === 'exploration' ? 'active' : ''} onClick={() => handleTab('exploration')}>{t('exploration')}</button>
        <button className={tab === 'shop' ? 'active' : ''} onClick={() => handleTab('shop')}>{t('shop')}</button>
        <button className={tab === 'achievements' ? 'active' : ''} onClick={() => handleTab('achievements')}>{t('achievements')}</button>
        <button className={tab === 'user' ? 'active' : ''} onClick={() => handleTab('user')}>{t('user')}</button>
      </div>
      {tab === 'mining' && <Mining />}
      {tab === 'combat' && <Combat />}
      {tab === 'blacksmith' && (
        <Blacksmith
          mining={{ gold: data.gold, stone: data.stone }}
          equipment={data.equipment}
          setMining={({ gold, stone }) => setData((prev: any) => ({ ...prev, gold, stone }))}
          setEquipment={(equipment) => setData((prev: any) => ({ ...prev, equipment }))}
        />
      )}
      {tab === 'cooking' && <Cooking />}
      {tab === 'exploration' && <Exploration />}
      {tab === 'shop' && <Shop />}
      {tab === 'achievements' && <Achievements />}
      {tab === 'user' && <UserPanel setUser={setUser} alert={alert} />}
    </div>
  );
}

export default App;
