import React from 'react';
import { render, screen } from '@testing-library/react';
import Exploration from '../components/game/Exploration';
import { defaultGameData } from '../types/GameData';

const mockUser = { uid: 'test' };
const mockData = {
  ...defaultGameData,
  unlocked: { ...defaultGameData.unlocked, exploration: false },
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

describe('Exploración', () => {
  test('no muestra exploración si no está desbloqueada', () => {
    render(<Exploration />);
    expect(screen.queryByText(/exploración/i)).not.toBeInTheDocument();
  });
}); 