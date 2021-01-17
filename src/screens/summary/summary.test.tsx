import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store, {gameSlice} from '@store';
import {render} from '@testing-library/react-native';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import {Provider as ReduxProvider} from 'react-redux';
import {act} from 'react-test-renderer';
import SummaryScreen from './summary';

const defaultMenuItemIds = [
  'temaki',
  'soySauce',
  'spoon',
  'onigiri',
  'edamame',
  'tempura',
  'pudding',
];

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

describe('Summary Screen', () => {
  beforeEach(() => {
    jest.spyOn(deviceInfoModule, 'getVersion').mockReturnValue('1.0.0');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`Scenario: See Summary Screen
      Given any      
      When I am at Summary Screen
      Then I should see 'Top Sushi Go-ers!'`, async () => {
    const {getByText} = render(
      <App
        component={SummaryScreen.Component}
        options={SummaryScreen.options}
      />,
    );
    await act(async () => {});

    expect(getByText('Top Sushi Go-ers!')).toBeDefined();
  });

  it(`Scenario: 3 Players
      Given that I have 3 players 'ME', 'John' 'Mary'
      When I am at Summary Screen
      Then I should see 'Top Three Player' 'ME' 'John' 'Mary'`, async () => {
    store.dispatch(gameSlice.actions.startGame(defaultMenuItemIds));
    store.dispatch(gameSlice.actions.addPlayer('John'));
    store.dispatch(gameSlice.actions.addPlayer('Mary'));

    const {getByTestId} = render(
      <App
        component={SummaryScreen.Component}
        options={SummaryScreen.options}
      />,
    );
    await act(async () => {});

    expect(getByTestId('TopThreePlayer.ME')).toBeDefined();
    expect(getByTestId('TopThreePlayer.John')).toBeDefined();
    expect(getByTestId('TopThreePlayer.Mary')).toBeDefined();
  });
});
