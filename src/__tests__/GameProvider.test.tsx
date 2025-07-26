import React from 'react';
import { render } from '@testing-library/react';
import { GameProvider, useGame } from '../components/game/GameProvider';

const TestComponent = () => {
  const { data, setData, save, user } = useGame();
  return <div>OK</div>;
};

describe('GameProvider', () => {
  test('renderiza sin errores', () => {
    render(
      <GameProvider user={{ uid: 'test' }}>
        <TestComponent />
      </GameProvider>
    );
  });
}); 