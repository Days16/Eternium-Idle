import React from 'react';
import { render, screen } from '@testing-library/react';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

describe('Selector de idioma', () => {
  test('muestra los botones de Español e Inglés', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText(/Español/i)).toBeInTheDocument();
    expect(screen.getByText(/English/i)).toBeInTheDocument();
  });
}); 