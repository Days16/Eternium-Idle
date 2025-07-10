import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Mining from '../components/activities/Mining';
import { defaultGameData } from '../types/GameData';

const mockUser = { uid: 'test' };
const mockData = {
  ...defaultGameData,
  gold: 50,
  stone: 30,
};

jest.mock('../components/GameProvider', () => {
  const actual = jest.requireActual('../components/GameProvider');
  return {
    ...actual,
    useGame: () => ({
      data: mockData,
      setData: jest.fn(),
      save: jest.fn(),
      user: mockUser,
    }),
  };
});

describe('Minería', () => {
  test('renderiza minería y muestra recursos', () => {
    i18n.changeLanguage('es');
    render(
      <I18nextProvider i18n={i18n}>
        <Mining />
      </I18nextProvider>
    );
    // Puede haber más de un elemento con 'Minería', solo comprobamos que exista al menos uno
    expect(screen.getAllByText(/minería/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/50/)).toBeInTheDocument();
    expect(screen.getByText(/30/)).toBeInTheDocument();
  });
}); 