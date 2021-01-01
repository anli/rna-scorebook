import {render} from '@testing-library/react-native';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import SettingScreen from './setting';

describe('Setting Screen', () => {
  beforeEach(() => {
    jest.spyOn(deviceInfoModule, 'getVersion').mockReturnValue('1.0.0');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`Scenario: See Setting Screen
      Given any
      And App Version is '1.0.0'
      When I am at Setting Screen
      Then I should see 'Settings'
      And I should see 'Version'
      And I should see '1.0.0'`, () => {
    const {getByText} = render(<SettingScreen.Component />);

    expect(getByText('Settings')).toBeDefined();
    expect(getByText('Version')).toBeDefined();
    expect(getByText('1.0.0')).toBeDefined();
  });
});
