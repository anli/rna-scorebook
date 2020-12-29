import {render, waitFor} from '@testing-library/react-native';
import React from 'react';
import App from './app';

describe('App', () => {
  it(`Scenario: Can see Home Screen on App load
      Given any
      When App load
      Then I should see "Home"`, async () => {
    const {getByText} = render(<App />);
    await waitFor(() => expect(getByText('Home')).toBeDefined());

    expect(getByText('Home')).toBeDefined();
  });
});
