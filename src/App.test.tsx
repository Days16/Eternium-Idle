import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

describe('Eternium Idle App', () => {
  test('muestra el título de bienvenida en español', () => {
    i18n.changeLanguage('es');
    render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    expect(screen.getByText(/bienvenido a eternium idle/i)).toBeInTheDocument();
  });

  test('muestra el título de bienvenida en inglés', () => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    expect(screen.getByText(/welcome to eternium idle/i)).toBeInTheDocument();
  });
});
