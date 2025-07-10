import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import Achievements from '../components/Achievements';

const mockUser = { uid: 'test' };

describe('Logros', () => {
  test('muestra la lista de logros', () => {
    render(
      <GameProvider user={mockUser}>
        <Achievements />
      </GameProvider>
    );
    expect(screen.getByText(/logros/i)).toBeInTheDocument();
    expect(screen.getByText(/Consigue 100 de oro/i)).toBeInTheDocument();
  });
}); 