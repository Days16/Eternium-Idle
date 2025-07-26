import React from 'react';
import { render, screen } from '@testing-library/react';
import Combat from '../components/game/Combat';
import { defaultGameData } from '../types/GameData';

const mockUser = { uid: 'test' };
const mockData = {
  ...defaultGameData,
  unlocked: { ...defaultGameData.unlocked, combat: false },
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

describe('Combate', () => {
  test('no muestra combate si no está desbloqueado', () => {
    render(<Combat />);
    expect(screen.queryByText(/combate/i)).not.toBeInTheDocument();
  });
}); 