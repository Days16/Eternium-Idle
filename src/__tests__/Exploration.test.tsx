import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import Exploration from '../components/activities/Exploration';

const mockUser = { uid: 'test' };

describe('Exploración', () => {
  test('no muestra exploración si no está desbloqueada', () => {
    render(
      <GameProvider user={mockUser}>
        <Exploration />
      </GameProvider>
    );
    expect(screen.queryByText(/exploración/i)).not.toBeInTheDocument();
  });
}); 