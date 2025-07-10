import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('muestra el título de bienvenida y login si no hay usuario', () => {
    render(<App />);
    expect(screen.getByText(/bienvenido a eternium idle/i)).toBeInTheDocument();
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });
}); 