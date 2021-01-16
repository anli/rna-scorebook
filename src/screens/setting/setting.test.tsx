import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
import {render} from '@testing-library/react-native';
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
});
