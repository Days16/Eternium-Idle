import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import UserPanel from '../components/UserPanel';
import { defaultGameData } from '../types/GameData';

const mockUser = { uid: 'test', email: 'test@ejemplo.com' };
const mockData = {
  ...defaultGameData,
  gold: 123,
  stats: { combatsWon: 5, recipesCooked: 2, explorations: 1 },
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

describe('Panel de usuario', () => {
  test('muestra email y estadísticas', () => {
    i18n.changeLanguage('es');
    render(
      <I18nextProvider i18n={i18n}>
        <UserPanel />
      </I18nextProvider>
    );
    expect(screen.getByText(/panel de usuario/i)).toBeInTheDocument();
    expect(screen.getByText(/test@ejemplo.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });
}); 