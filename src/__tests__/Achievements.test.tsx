import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../services/i18n';
import Achievements from '../components/game/Achievements';
import { defaultGameData } from '../types/GameData';

const mockUser = { uid: 'test' };
const mockData = {
  ...defaultGameData,
  achievements: ['ach_gold100'],
};

jest.mock('../components/game/GameProvider', () => {
  const actual = jest.requireActual('../components/game/GameProvider');
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

describe('Logros', () => {
  test('muestra la lista de logros', () => {
    i18n.changeLanguage('es');
    render(
      <I18nextProvider i18n={i18n}>
        <Achievements />
      </I18nextProvider>
    );
    expect(screen.getByText(/logros/i)).toBeInTheDocument();
    expect(screen.getByText(/Consigue 100 de oro/i)).toBeInTheDocument();
  });
}); 