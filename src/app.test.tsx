import {render} from '@testing-library/react-native';
import React from 'react';
import App from './app';

describe('App', () => {
  it(`Scenario: App can load
        Given any
        When App load
        Then I should see "App"`, () => {
    const {getByText} = render(<App />);
    expect(getByText('App')).toBeDefined();
  });
});
