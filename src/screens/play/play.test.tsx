import {render} from '@testing-library/react-native';
import React from 'react';
import PlayScreen from './play';

describe('Play Screen', () => {
  it(`Scenario: See Play Screen
    Given any
    When I am at Play Screen
    Then I should see 'Play'`, () => {
    const {getByText} = render(<PlayScreen.Component />);
    expect(getByText('Play')).toBeDefined();
  });
});
