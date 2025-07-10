import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

interface MiningData {
  gold: number;
  stone: number;
  lastUpdate: number;
}

const AUTOSAVE_INTERVAL = 30000; // 30 segundos
const MINING_INTERVAL = 1000; // 1 segundo

const defaultData: MiningData = {
  gold: 0,
  stone: 0,
  lastUpdate: Date.now(),
};

const Mining: React.FC<{ user: any }> = ({ user }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<MiningData>(defaultData);
  const [loading, setLoading] = useState(true);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Cargar datos al iniciar
  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setData(snap.data() as MiningData);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [user.uid]);

  // Minería automática
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        gold: prev.gold + 1,
        stone: prev.stone + 2,
        lastUpdate: Date.now(),
      }));
    }, MINING_INTERVAL);
    return () => clearInterval(interval);
  }, [loading]);

  // Autoguardado
  useEffect(() => {
    if (loading) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      const ref = doc(db, 'users', user.uid);
      setDoc(ref, data, { merge: true });
    }, AUTOSAVE_INTERVAL);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [data, loading, user.uid]);

  if (loading) return <p>{t('loading')}</p>;

  return (
    <div className="activity-section">
      <h2>{t('mining')}</h2>
      <div style={{ width: 64, height: 64, background: 'gray', margin: '0 auto', borderRadius: 8 }} />
      <p>Oro: {data.gold}</p>
      <p>Piedra: {data.stone}</p>
      <p style={{ fontSize: 12, color: '#aaa' }}>({t('loading')} autosave...)</p>
      {/* Aquí se desbloquearán nuevas actividades como combate, cocina y exploración */}
    </div>
  );
};

export default Mining; 