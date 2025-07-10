import React from 'react';
import { useTranslation } from 'react-i18next';

const flag = {
  es: '🇪🇸',
  en: '🇬🇧',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  return (
    <div className="language-switcher">
      <button
        className={`lang-btn${i18n.language === 'es' ? ' active' : ''}`}
        onClick={() => i18n.changeLanguage('es')}
        disabled={i18n.language === 'es'}
      >
        <span style={{ fontSize: 22, marginRight: 6 }}>{flag.es}</span> {t('spanish')}
      </button>
      <button
        className={`lang-btn${i18n.language === 'en' ? ' active' : ''}`}
        onClick={() => i18n.changeLanguage('en')}
        disabled={i18n.language === 'en'}
        style={{ marginLeft: 8 }}
      >
        <span style={{ fontSize: 22, marginRight: 6 }}>{flag.en}</span> {t('english')}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 