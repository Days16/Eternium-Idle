import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Shop from '../components/Shop';
import { defaultGameData } from '../types/GameData';

const mockUser = { uid: 'test' };
const mockData = {
  ...defaultGameData,
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

describe('Tienda', () => {
  test('muestra los botones de mejoras', () => {
    i18n.changeLanguage('es');
    render(
      <I18nextProvider i18n={i18n}>
        <Shop />
      </I18nextProvider>
    );
    expect(screen.getByText(/mejorar minería/i)).toBeInTheDocument();
    expect(screen.getByText(/mejorar combate/i)).toBeInTheDocument();
  });
}); 