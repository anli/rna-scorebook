import {render} from '@testing-library/react-native';
import React from 'react';
import HomeScreen from './home';

describe('Home Screen', () => {
  it(`Scenario: See Home Screen
    Given any
    When I am at Home Screen
    Then I should see 'Home'`, () => {
    const {getByText} = render(<HomeScreen.Component />);
    expect(getByText('Home')).toBeDefined();
  });
});
