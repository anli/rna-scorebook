import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store, {playMenuItemsMapSlice} from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import PlayScreen from './play';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...(jest.requireActual('@react-navigation/native') as any),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const App = ({component, options}: any) => {
  const Stack = createStackNavigator();

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="App" component={component} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};

describe('Play Screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Scenario: No game
      Given that there is no game
      When I am at Play Screen
      Then I should see 'Start Button'`, async () => {
    const {getByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );
    await act(async () => {});

    expect(getByTestId('StartButton')).toBeDefined();
  });

  it(`Scenario: Start game
      Given that there is no game
      And I am at Play Screen
      When I press 'Start Button'
      Then I should see 'Player Add Screen'`, async () => {
    const {getByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    await act(async () => {});

    fireEvent.press(getByTestId('StartButton'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toBeCalledWith('PlayerAddScreen');
  });

  it(`Scenario: Has game
      Given that there is a game
      When I am at Play Screen
      Then I should not see 'Start Button'`, async () => {
    store.dispatch(
      playMenuItemsMapSlice.actions.set({
        maki: true,
      }),
    );

    const {queryByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    await act(async () => {});

    expect(queryByTestId('StartButton')).toBeNull();
  });
});
