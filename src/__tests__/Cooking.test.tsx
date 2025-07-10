import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import Cooking from '../components/activities/Cooking';
import { defaultGameData } from '../types/GameData';

const mockUser = { uid: 'test' };
const mockData = {
  ...defaultGameData,
  unlocked: { ...defaultGameData.unlocked, cooking: false },
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

describe('Cocina', () => {
  test('no muestra cocina si no está desbloqueada', () => {
    render(<Cooking />);
    expect(screen.queryByText(/cocina/i)).not.toBeInTheDocument();
  });
}); 