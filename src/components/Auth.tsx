import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

const Auth: React.FC<{ onAuth: (user: any) => void, user: any }> = ({ onAuth, user }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [cooldownLogout, setCooldownLogout] = useState(false);
  const [cooldownTabs, setCooldownTabs] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setCooldownTabs(true);
    setTimeout(() => setCooldownTabs(false), 1000);
    try {
      if (isRegister) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (res && res.user) {
          onAuth(res.user);
          setSuccess(t('register_success'));
        } else {
          setError('Error inesperado en el registro.');
        }
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res && res.user) {
          onAuth(res.user);
          setSuccess(t('login_success'));
        } else {
          setError('Error inesperado en el inicio de sesión.');
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setCooldownLogout(true);
    await signOut(auth);
    onAuth(null);
    setTimeout(() => setCooldownLogout(false), 1000);
  };

  if (user) {
    return (
      <div className="auth-logged">
        <p>{user.email}</p>
        <button className="btn" onClick={handleLogout} disabled={cooldownLogout}>{t('logout')}</button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={isRegister ? '' : 'active'} onClick={() => { if (!cooldownTabs) { setIsRegister(false); setCooldownTabs(true); setTimeout(() => setCooldownTabs(false), 1000); } }} disabled={cooldownTabs}>{t('login')}</button>
        <button className={isRegister ? 'active' : ''} onClick={() => { if (!cooldownTabs) { setIsRegister(true); setCooldownTabs(true); setTimeout(() => setCooldownTabs(false), 1000); } }} disabled={cooldownTabs}>{t('register')}</button>
      </div>
      <form onSubmit={handleAuth} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">{t('password')}</label>
        <input
          id="password"
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={loading || cooldownTabs}>
          {loading ? t('loading') : isRegister ? t('register') : t('login')}
        </button>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
      </form>
    </div>
  );
};

export default Auth; 