import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import Mining from '../components/activities/Mining';

const mockUser = { uid: 'test' };

describe('Minería', () => {
  test('renderiza minería y muestra recursos', () => {
    render(
      <GameProvider user={mockUser}>
        <Mining />
      </GameProvider>
    );
    expect(screen.getByText(/minería/i)).toBeInTheDocument();
    expect(screen.getByText(/Oro:/i)).toBeInTheDocument();
    expect(screen.getByText(/Piedra:/i)).toBeInTheDocument();
  });
}); 