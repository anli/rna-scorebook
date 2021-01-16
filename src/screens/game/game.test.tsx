import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store, {gameSlice} from '@store';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import {Provider as ReduxProvider} from 'react-redux';
import {act} from 'react-test-renderer';
import GameScreen from './game';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...(jest.requireActual('@react-navigation/native') as any),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

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

const defaultMenuItemIds = [
  'temaki',
  'soySauce',
  'spoon',
  'onigiri',
  'edamame',
  'tempura',
  'pudding',
];

describe('Game Screen', () => {
  beforeEach(() => {
    jest.spyOn(deviceInfoModule, 'getVersion').mockReturnValue('1.0.0');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`Scenario: See No Game UI
      Given that I have no game
      When I am at 'Game screen'
      Then I should see 'You have not started any game yet'`, async () => {
    const {getByText} = render(
      <App component={GameScreen.Component} options={GameScreen.options} />,
    );
    await act(async () => {});

    expect(getByText('You have not started any game yet.')).toBeDefined();
  });

  it(`Scenario: See has game UI
      Given that I have a game
      When I am at 'Game Screen'
      Then I should see 'Sushi Go Party!'
      And I should see 'Add Player Button'
      And I should see 'ME'
      And I should see 'Round 1 Tab'
      And I should see 'Round 2 Tab'
      And I should see 'Round 3 Tab'`, async () => {
    store.dispatch(gameSlice.actions.startGame(defaultMenuItemIds));

    const {getByText, getByTestId} = render(
      <App component={GameScreen.Component} options={GameScreen.options} />,
    );
    await act(async () => {});

    expect(getByText('Sushi Go Party!')).toBeDefined();

    expect(getByText('Add')).toBeDefined();
    expect(getByText('ME')).toBeDefined();
    expect(getByTestId('Round1Button')).toBeDefined();
    expect(getByTestId('Round2Button')).toBeDefined();
    expect(getByTestId('Round3Button')).toBeDefined();
  });

  it(`Scenario: Add Player
      Given that I have a game
      And I am at 'Game Screen'
      When I press 'Add Player Button'
      Then I should see 'Player Add Screen'`, async () => {
    store.dispatch(gameSlice.actions.startGame(defaultMenuItemIds));
    const {getByTestId} = render(
      <App component={GameScreen.Component} options={GameScreen.options} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('AddPlayerButton'));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('PlayerAddScreen');
  });

  it(`Scenario: Select Player
      Given that I have a game
      And that I have players 'ME', 'John'
      And that I have 'John' Selected
      And that I am at 'Game Screen'
      When I press 'ME Button'
      Then I should see 'ME' selected`, async () => {
    store.dispatch(gameSlice.actions.startGame(defaultMenuItemIds));
    store.dispatch(gameSlice.actions.addPlayer('John'));
    const {getByTestId} = render(
      <App component={GameScreen.Component} options={GameScreen.options} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('SelectPlayerButton.ME'));
    });

    expect(getByTestId('SelectPlayerButton.ME.Avatar').props.selected).toEqual(
      true,
    );
  });

  it(`Scenario: Select Menu Item Option
      Given that I have a game
      And I press 
      When I press 'Pudding Button'
      Then I should see 'Pudding Options'
      When I press 'N/A'
      Then I want to see 'Pudding' with score '0'`, async () => {
    store.dispatch(gameSlice.actions.startGame(defaultMenuItemIds));
    const {getByTestId} = render(
      <App component={GameScreen.Component} options={GameScreen.options} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('MenuItemButton.pudding'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('MenuItemOption.N/A'));
    });
  });

  it(`Scenario: Select Menu Item Option with no config
      Given that I have a game
      And I press 
      When I press 'Spoon Button'
      Then I should not see 'Spoon Options'`, async () => {
    store.dispatch(gameSlice.actions.startGame(defaultMenuItemIds));
    const {getByTestId} = render(
      <App component={GameScreen.Component} options={GameScreen.options} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('MenuItemButton.spoon'));
    });
  });
});
