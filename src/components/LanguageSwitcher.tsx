import React from 'react';
import { useTranslation } from 'react-i18next';

const flag = {
  es: '🇪🇸',
  en: '🇬🇧',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [cooldown, setCooldown] = React.useState(false);
  const handleChangeLanguage = (lang: string) => {
    if (cooldown || i18n.language === lang) return;
    setCooldown(true);
    i18n.changeLanguage(lang);
    setTimeout(() => setCooldown(false), 1000);
  };
  return (
    <div className="language-switcher">
      <button
        className={`lang-btn${i18n.language === 'es' ? ' active' : ''}`}
        onClick={() => handleChangeLanguage('es')}
        disabled={i18n.language === 'es' || cooldown}
      >
        <span style={{ fontSize: 22, marginRight: 6 }}>{flag.es}</span> {t('spanish')}
      </button>
      <button
        className={`lang-btn${i18n.language === 'en' ? ' active' : ''}`}
        onClick={() => handleChangeLanguage('en')}
        disabled={i18n.language === 'en' || cooldown}
        style={{ marginLeft: 8 }}
      >
        <span style={{ fontSize: 22, marginRight: 6 }}>{flag.en}</span> {t('english')}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 