import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import Cooking from '../components/activities/Cooking';

const mockUser = { uid: 'test' };

describe('Cocina', () => {
  test('no muestra cocina si no está desbloqueada', () => {
    render(
      <GameProvider user={mockUser}>
        <Cooking />
      </GameProvider>
    );
    expect(screen.queryByText(/cocina/i)).not.toBeInTheDocument();
  });
}); 