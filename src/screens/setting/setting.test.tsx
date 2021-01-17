import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import InAppReview from 'react-native-in-app-review';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import {Provider as ReduxProvider} from 'react-redux';
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
    const spyRequestInAppReview = jest.spyOn(InAppReview, 'RequestInAppReview');
    const {getByText} = render(
      <App
        component={SettingScreen.Component}
        options={SettingScreen.options}
      />,
    );
    await act(async () => {
      fireEvent.press(getByText('Send a feedback or review'));
    });

    expect(spyRequestInAppReview).toHaveBeenCalledTimes(1);
  });
});
