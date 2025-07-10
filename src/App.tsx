import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Auth from './components/Auth';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LanguageSwitcher from './components/LanguageSwitcher';
import { GameProvider, useGame } from './components/GameProvider';
import Mining from './components/activities/Mining';
import Combat from './components/activities/Combat';
import Cooking from './components/activities/Cooking';
import Exploration from './components/activities/Exploration';
import Shop from './components/Shop';
import Achievements from './components/Achievements';
import UserPanel from './components/UserPanel';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

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
  const [hasBackup, setHasBackup] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const backupRef = useRef<any>(null);
  const prevDev = useRef<boolean>(data?.dev ?? false);

  // Sincronizar dev con Firestore cada vez que se monta o cambia el usuario
  useEffect(() => {
    const syncDevWithFirestore = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const remoteDev = snap.data().dev;
          if (typeof remoteDev === 'boolean' && remoteDev !== data?.dev) {
            setData((prev: any) => ({ ...prev, dev: remoteDev }));
          }
        }
      }
    };
    syncDevWithFirestore();
    // eslint-disable-next-line
  }, [user]);

  // Mostrar alertas temporales
  const showAlert = (msg: string) => {
    setAlert(msg);
    setTimeout(() => setAlert(null), 3000);
  };

  // Al montar o cuando data?.dev cambie, si dev está activo y hay backup en Firestore, cargarlo o crearlo si no existe (solo la primera vez)
  useEffect(() => {
    const fetchOrCreateBackup = async () => {
      if (user && data?.dev) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().devBackup) {
          if (!hasBackup) {
            backupRef.current = snap.data().devBackup;
            setHasBackup(true);
          }
        } else if (!hasBackup) {
          // Solo crear backup si no existe
          backupRef.current = { ...data, dev: false };
          setHasBackup(true);
          await setDoc(ref, { devBackup: backupRef.current }, { merge: true });
          showAlert(t('dev_backup_created'));
        }
      }
    };
    fetchOrCreateBackup();
    // eslint-disable-next-line
  }, [data?.dev, user]);

  // Restaurar backup automáticamente al desactivar modo dev o si backup existe pero dev ya no
  useEffect(() => {
    const restoreBackup = async () => {
      if (user && data && !data.dev && hasBackup && backupRef.current) {
        setData({ ...backupRef.current, dev: false });
        setHasBackup(false);
        backupRef.current = null;
        const ref = doc(db, 'users', user.uid);
        await setDoc(ref, { devBackup: null }, { merge: true });
        showAlert(t('dev_backup_restored'));
      } else if (user && !data?.dev && hasBackup) {
        // Si backup existe pero dev ya no, borra backup de Firestore y memoria
        setHasBackup(false);
        backupRef.current = null;
        const ref = doc(db, 'users', user.uid);
        await setDoc(ref, { devBackup: null }, { merge: true });
      }
    };
    restoreBackup();
    // eslint-disable-next-line
  }, [data?.dev, user, hasBackup]);

  // Al montar o cuando data?.dev cambie, si dev es false y existe devBackup en Firestore, restaura el backup y bórralo
  useEffect(() => {
    const restoreBackupIfDevFalse = async () => {
      if (user && data && !data.dev) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().devBackup) {
          // Restaurar el backup y borrarlo
          const restored = { ...snap.data().devBackup, dev: false };
          setData(restored);
          setHasBackup(false);
          backupRef.current = null;
          await setDoc(ref, { ...restored, devBackup: null }, { merge: true });
          showAlert(t('dev_backup_restored'));
        }
      }
    };
    restoreBackupIfDevFalse();
    // eslint-disable-next-line
  }, [data?.dev, user]);

  // Botón para desbloquear todo (solo si dev y hay backup)
  const unlockAll = () => {
    if (setData && data && hasBackup) {
      setData((prev: any) => ({
        ...prev,
        gold: 999999,
        stone: 999999,
        iron: 999999,
        copper: 999999,
        silver: 999999,
        food: 999999,
        gems: 999999,
        unlocked: {
          mining: true,
          combat: true,
          cooking: true,
          exploration: true,
        },
        combatLevel: 99,
        miningLevel: 99,
        stats: {
          combatsWon: 9999,
          recipesCooked: 9999,
          explorations: 9999,
        },
        upgrades: {
          mining: 99,
          combat: 99,
        },
        achievements: ['ach_gold100','ach_stone100','ach_combat1','ach_cook1','ach_explore1'],
      }));
    }
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
        <button className={tab === 'mining' ? 'active' : ''} onClick={() => setTab('mining')}>{t('mining')}</button>
        <button className={tab === 'combat' ? 'active' : ''} onClick={() => setTab('combat')}>{t('combat')}</button>
        <button className={tab === 'cooking' ? 'active' : ''} onClick={() => setTab('cooking')}>{t('cooking')}</button>
        <button className={tab === 'exploration' ? 'active' : ''} onClick={() => setTab('exploration')}>{t('exploration')}</button>
        <button className={tab === 'shop' ? 'active' : ''} onClick={() => setTab('shop')}>{t('shop')}</button>
        <button className={tab === 'achievements' ? 'active' : ''} onClick={() => setTab('achievements')}>{t('achievements')}</button>
        <button className={tab === 'user' ? 'active' : ''} onClick={() => setTab('user')}>{t('user')}</button>
      </div>
      {tab === 'mining' && <Mining />}
      {tab === 'combat' && <Combat />}
      {tab === 'cooking' && <Cooking />}
      {tab === 'exploration' && <Exploration />}
      {tab === 'shop' && <Shop />}
      {tab === 'achievements' && <Achievements />}
      {tab === 'user' && <UserPanel setUser={setUser} unlockAll={unlockAll} hasBackup={hasBackup} isDev={data?.dev} alert={alert} />}
    </div>
  );
}

export default App;
