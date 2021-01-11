import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import {Provider as ReduxProvider} from 'react-redux';
import {act} from 'react-test-renderer';
import SettingScreen from './setting';

const App = ({component, options}: any) => {
  const Stack = createStackNavigator();

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Host>
            <Stack.Navigator>
              <Stack.Screen
                name="App"
                component={component}
                options={options}
              />
            </Stack.Navigator>
          </Host>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

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
      And I should see '1.0.0'`, async () => {
    const {getByText} = render(
      <App
        component={SettingScreen.Component}
        options={SettingScreen.options}
      />,
    );
    await act(async () => {});

    expect(getByText('Settings')).toBeDefined();
    expect(getByText('Version')).toBeDefined();
    expect(getByText('1.0.0')).toBeDefined();
  });

  it(`Scenario: Set default name
      Given that I have no default name set
      When I am at Setting Screen
      Then I should see 'Default Name'
      And I should see 'Setup one now'
      When I press 'Default name'
      Then I should see 'Default Name Dialog' 'Name Input'
      When I enter 'John'
      And I press 'Confirm Button'
      Then I should see 'John'
      When I press 'Default name'
      And I press 'Clear Button'
      Then I should see 'Setup one now'`, async () => {
    const {getByText, getByTestId} = render(
      <App
        component={SettingScreen.Component}
        options={SettingScreen.options}
      />,
    );
    await act(async () => {});

    expect(getByText('Default Name')).toBeDefined();
    expect(getByText('Setup one now')).toBeDefined();

    await act(async () => {
      fireEvent.press(getByText('Default Name'));
    });

    expect(getByTestId('DefaultNameDialog.NameInput')).toBeDefined();

    await act(async () => {
      fireEvent(
        getByTestId('DefaultNameDialog.NameInput'),
        'onChangeText',
        'John',
      );
    });

    await act(async () => {
      fireEvent.press(getByTestId('DefaultNameDialog.ConfirmButton'));
    });
    expect(getByText('John')).toBeDefined();

    await act(async () => {
      fireEvent.press(getByText('Default Name'));
    });
    await act(async () => {
      fireEvent.press(getByTestId('DefaultNameDialog.ClearButton'));
    });
    expect(getByText('Setup one now')).toBeDefined();
  });
});
