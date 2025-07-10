import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameProvider } from '../components/GameProvider';
import UserPanel from '../components/UserPanel';

const mockUser = { uid: 'test', email: 'test@ejemplo.com' };

describe('Panel de usuario', () => {
  test('muestra email y estadísticas', () => {
    render(
      <GameProvider user={mockUser}>
        <UserPanel />
      </GameProvider>
    );
    expect(screen.getByText(/panel de usuario/i)).toBeInTheDocument();
    expect(screen.getByText(/test@ejemplo.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Oro:/i)).toBeInTheDocument();
    expect(screen.getByText(/Combates ganados:/i)).toBeInTheDocument();
  });
}); 