import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getStore} from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import {Provider as ReduxProvider} from 'react-redux';
import SettingScreen from './setting';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...(jest.requireActual('@react-navigation/native') as any),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const App = ({
  component,
  options,
  initialParams = {},
  storeOptions = {},
}: any) => {
  const Stack = createStackNavigator();

  return (
    <ReduxProvider store={getStore(storeOptions)}>
      <PaperProvider>
        <NavigationContainer>
          <Host>
            <Stack.Navigator>
              <Stack.Screen
                name="App"
                component={component}
                options={options}
                initialParams={initialParams}
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
      And I should see '1.0.0'
      And I should see 'Send a feedback or review'
      And I should see 'Thank you for your support!'`, async () => {
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
    expect(getByText('Send a feedback or review')).toBeDefined();
    expect(getByText('Thank you for your support!')).toBeDefined();
  });

  it(`Scenario: Send feedback
      Given that I am at Setting Screen
      When I press 'Send a feedback or review'
      Then I should see 'In App Review'`, async () => {
    const spy = jest.spyOn(Linking, 'openURL');
    const {getByText} = render(
      <App
        component={SettingScreen.Component}
        options={SettingScreen.options}
      />,
    );
    await act(async () => {
      fireEvent.press(getByText('Send a feedback or review'));
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Scenario: Press Beta Scythe with no existing game
      Given that I have no existing game
      When I press 'Scorebook for Scythe'
      Then I should see 'Scythe Screen'
      And I should see a new game`, async () => {
    const {getByText} = render(
      <App
        component={SettingScreen.Component}
        options={SettingScreen.options}
      />,
    );
    await act(async () => {
      fireEvent.press(getByText('Scorebook for Scythe'));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('SessionScreen');
  });
});
