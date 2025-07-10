import React from 'react';
import { render, screen } from '@testing-library/react';
import Auth from '../components/Auth';

describe('Auth', () => {
  test('muestra el formulario de login y registro', () => {
    render(<Auth onAuth={() => {}} user={null} />);
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
  });
}); 