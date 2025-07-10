import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GameData, defaultGameData } from '../types/GameData';

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
        setData({ ...defaultGameData, ...snap.data() });
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