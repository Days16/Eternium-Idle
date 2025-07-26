import React from 'react';
import { render, screen } from '@testing-library/react';
import Blacksmith from '../components/game/Blacksmith';
import { I18nextProvider } from 'react-i18next';
import i18n from '../services/i18n';

const mockMining = { gold: 100, stone: 100 };
const mockEquipment = { sword: false, armor: false, helmet: false };
const mockSetMining = jest.fn();
const mockSetEquipment = jest.fn();

jest.mock('../components/game/GameProvider', () => ({
  useGame: () => ({
    data: { unlocked: { blacksmith: true }, iron: 200, achievements: [] },
    setData: jest.fn(),
  }),
}));

describe('Blacksmith', () => {
  test('muestra el título y botones de forja', () => {
    i18n.changeLanguage('es');
    render(
      <I18nextProvider i18n={i18n}>
        <Blacksmith
          mining={mockMining}
          equipment={mockEquipment}
          setMining={mockSetMining}
          setEquipment={mockSetEquipment}
        />
      </I18nextProvider>
    );
    expect(screen.getByText(/herrero/i)).toBeInTheDocument();
    expect(screen.getByText(/forja equipamiento/i)).toBeInTheDocument();
  });
}); 