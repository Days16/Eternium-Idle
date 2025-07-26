import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../../services/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GameData, defaultGameData } from '../../types/GameData';

interface GameContextProps {
  data: GameData;
  setData: React.Dispatch<React.SetStateAction<GameData>>;
  save: () => void;
  user: any;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame debe usarse dentro de GameProvider');
  return ctx;
};

export const GameProvider: React.FC<{ user: any; children: React.ReactNode }> = ({ user, children }) => {
  const [data, setData] = useState<GameData>(defaultGameData);
  const [loading, setLoading] = useState(true);

  // Cargar datos de Firestore
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const userData = { ...defaultGameData, ...snap.data() };
        // --- Asegurar que 'unlocked' tiene todos los campos ---
        const unlocked = {
          ...userData.unlocked,
          combat: userData.unlocked?.combat ?? false,
          cooking: userData.unlocked?.cooking ?? false,
          exploration: userData.unlocked?.exploration ?? false,
          blacksmith: userData.unlocked?.blacksmith ?? false,
          mining: (userData.unlocked && 'mining' in userData.unlocked) ? userData.unlocked.mining : true,
        };
        if (JSON.stringify(unlocked) !== JSON.stringify(userData.unlocked)) {
          await setDoc(ref, { unlocked }, { merge: true });
        }
        userData.unlocked = unlocked;
        setData(userData);
      } else {
        setData({ ...defaultGameData });
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [user]);

  // Guardado automático
  useEffect(() => {
    if (loading || !user) return;
    const ref = doc(db, 'users', user.uid);
    setDoc(ref, data, { merge: true });
    // Guardado local para soporte offline
    localStorage.setItem('eterniumIdleSave', JSON.stringify(data));
  }, [data, loading, user]);

  // Cargar desde localStorage si no hay conexión
  useEffect(() => {
    if (!user) return;
    const local = localStorage.getItem('eterniumIdleSave');
    if (local) {
      setData((prev) => ({ ...prev, ...JSON.parse(local) }));
    }
  }, [user]);

  const save = () => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    setDoc(ref, data, { merge: true });
    localStorage.setItem('eterniumIdleSave', JSON.stringify(data));
  };

  if (loading) return <div>Cargando datos...</div>;

  return (
    <GameContext.Provider value={{ data, setData, save, user }}>
      {children}
    </GameContext.Provider>
  );
}; 