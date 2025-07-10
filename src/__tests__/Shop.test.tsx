import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import Shop from '../components/Shop';

const mockUser = { uid: 'test' };

describe('Tienda', () => {
  test('muestra los botones de mejoras', () => {
    render(
      <GameProvider user={mockUser}>
        <Shop />
      </GameProvider>
    );
    expect(screen.getByText(/mejorar minería/i)).toBeInTheDocument();
    expect(screen.getByText(/mejorar combate/i)).toBeInTheDocument();
  });
}); 