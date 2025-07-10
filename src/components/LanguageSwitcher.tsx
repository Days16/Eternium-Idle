import React from 'react';
import { useTranslation } from 'react-i18next';

const flag = {
  es: '🇪🇸',
  en: '🇬🇧',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [cooldown, setCooldown] = React.useState(false);
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (cooldown || i18n.language === lang) return;
    setCooldown(true);
    i18n.changeLanguage(lang);
    setTimeout(() => setCooldown(false), 1000);
  };
  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={handleChangeLanguage}
        disabled={cooldown}
        style={{ minWidth: 120, fontSize: '1.1rem', padding: '0.5rem 1.2rem', borderRadius: 8, background: '#232323', color: '#b3b8c7', border: '1.5px solid #181818', fontWeight: 'bold' }}
      >
        <option value="es">{flag.es} {t('spanish')}</option>
        <option value="en">{flag.en} {t('english')}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher; 