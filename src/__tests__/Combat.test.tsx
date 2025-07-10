import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import Combat from '../components/activities/Combat';

const mockUser = { uid: 'test' };

describe('Combate', () => {
  test('no muestra combate si no está desbloqueado', () => {
    render(
      <GameProvider user={mockUser}>
        <Combat />
      </GameProvider>
    );
    expect(screen.queryByText(/combate/i)).not.toBeInTheDocument();
  });
}); 