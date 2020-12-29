import {render} from '@testing-library/react-native';
import React from 'react';
import PlayScreen from './play';

describe('Play Screen', () => {
  it(`Scenario: No game
      Given that there is no game
      When I am at Play Screen
      Then I should see 'StartButton'`, () => {
    const {getByTestId} = render(<PlayScreen.Component />);
    expect(getByTestId('StartButton')).toBeDefined();
  });
});
