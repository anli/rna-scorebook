import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store, {playSlice} from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Alert} from 'react-native';
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
      Then I should not see 'Start Button'
      And I should see 'Round 1'
      And I should see 'Next Round Button'
      And I should not see 'Previous Round Button'`, async () => {
    store.dispatch(
      playSlice.actions.setMenuItemsMap({
        edamame: true,
        onigiri: true,
        pudding: true,
        soySauce: true,
        temaki: true,
        tempura: true,
        wasabi: true,
      }),
    );

    store.dispatch(
      playSlice.actions.setPlayersMap({
        John: true,
      }),
    );

    const {queryByTestId, getByText, getByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    await act(async () => {});

    expect(queryByTestId('StartButton')).toBeNull();
    expect(getByText('Round 1 (0)')).toBeDefined();
    expect(getByTestId('Round.NextButton')).toBeDefined();
    expect(queryByTestId('Round.PreviousButton')).toBeNull();
  });

  it(`Scenario: Change round
      Given that there is a game
      And I am at Play Screen
      When I press the 'Next Round Button'
      Then I should see 'Round 2'
      When I press the 'Next Round Button'
      Then I should see 'Round 3'
      And I should not see 'Next Round Button'
      When I press the 'Previous Round Button'
      Then I should see 'Round 2'`, async () => {
    store.dispatch(
      playSlice.actions.setMenuItemsMap({
        edamame: true,
        onigiri: true,
        pudding: true,
        soySauce: true,
        temaki: true,
        tempura: true,
        wasabi: true,
      }),
    );

    store.dispatch(
      playSlice.actions.setPlayersMap({
        John: true,
      }),
    );

    const {queryByTestId, getByText, getByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('Round.NextButton'));
    });
    expect(getByText('Round 2 (0)')).toBeDefined();

    await act(async () => {
      fireEvent.press(getByTestId('Round.NextButton'));
    });
    expect(getByText('Round 3 (0)')).toBeDefined();
    expect(queryByTestId('Round.NextButton')).toBeNull();

    await act(async () => {
      fireEvent.press(getByTestId('Round.PreviousButton'));
    });
    expect(getByText('Round 2 (0)')).toBeDefined();
  });

  it(`Scenario: Adjust Score
      Given that there is a game
      And I am at Play Screen
      When I press the 'WASABI Add Button'
      And I press the 'WASABI Add Button'
      Then I should see 'Round 1 (2)'
      And I should see 'WASABI (2)'
      When I press the 'WASABI Minus Button'
      Then I should see 'Round 1 (1)'
      And I should see 'WASABI (1)'
      When I press the 'Next Round Button'
      Then I should see 'Round 2 (0)'
      And I should see 'WASABI (0)'`, async () => {
    store.dispatch(
      playSlice.actions.setMenuItemsMap({
        edamame: true,
        onigiri: true,
        pudding: true,
        soySauce: true,
        temaki: true,
        tempura: true,
        wasabi: true,
      }),
    );

    store.dispatch(
      playSlice.actions.setPlayersMap({
        John: true,
      }),
    );

    const {getByText, getByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('wasabi.AddButton'));
      fireEvent.press(getByTestId('wasabi.AddButton'));
    });
    expect(getByText('Round 1 (2)')).toBeDefined();

    await act(async () => {
      fireEvent.press(getByTestId('wasabi.MinusButton'));
    });
    expect(getByText('Round 1 (1)')).toBeDefined();

    await act(async () => {
      fireEvent.press(getByTestId('Round.NextButton'));
    });
    expect(getByText('Round 2 (0)')).toBeDefined();
  });

  it(`Scenario: Reset Button
      Given that there is a game
      And I am at Play Screen
      When I press the 'Reset Button'
      And I see 'Alert'
      And I press 'Cancel'
      And I press the 'Reset Button'
      And I see 'Alert'
      And I press 'OK'
      Then I should see 'Start Button'`, async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    store.dispatch(
      playSlice.actions.setMenuItemsMap({
        edamame: true,
        onigiri: true,
        pudding: true,
        soySauce: true,
        temaki: true,
        tempura: true,
        wasabi: true,
      }),
    );

    const {getByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('ResetButton'));
    });

    expect(alertSpy).toHaveBeenCalled();
    await act(async () => {
      alertSpy.mock.calls[0][2]?.[0].onPress &&
        alertSpy.mock.calls[0][2]?.[0].onPress();
    });

    await act(async () => {
      fireEvent.press(getByTestId('ResetButton'));
    });
    await act(async () => {
      alertSpy.mock.calls[0][2]?.[1].onPress &&
        alertSpy.mock.calls[0][2]?.[1].onPress();
    });

    expect(alertSpy).toHaveBeenCalled();
    expect(getByTestId('StartButton')).toBeDefined();
  });

  it(`Scenario: Add Player to existing play
      Given that there is an existing play
      And I am at Play Screen
      When I press the 'Add Player Button'
      Then I should see 'Player Add Screen'`, async () => {
    store.dispatch(
      playSlice.actions.setMenuItemsMap({
        edamame: true,
        onigiri: true,
        pudding: true,
        soySauce: true,
        temaki: true,
        tempura: true,
        wasabi: true,
      }),
    );
    store.dispatch(
      playSlice.actions.setPlayersMap({
        John: true,
      }),
    );

    const {getByTestId} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    expect(getByTestId('AddPlayerButton')).toBeDefined();
    await act(async () => {
      fireEvent.press(getByTestId('AddPlayerButton'));
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toBeCalledWith('PlayerAddScreen', {
      mode: 'ADD_ONLY',
    });
  });

  it(`Scenario: Select another existing player
      Given that there is an existing play
      And that there is two players, 'John' 'Mary'
      And that score of round1 'John' is 1
      And that score of round1 'Mary' is 0
      And that player selected is 'John'
      And I am at Play Screen
      When I press the 'Mary Player Button'
      And that player selected is 'Mary'
      And that round score is 0`, async () => {
    store.dispatch(
      playSlice.actions.setMenuItemsMap({
        edamame: true,
        onigiri: true,
        pudding: true,
        soySauce: true,
        temaki: true,
        tempura: true,
        wasabi: true,
      }),
    );
    store.dispatch(
      playSlice.actions.setPlayersMap({
        John: true,
        Mary: true,
      }),
    );

    const {getByTestId, getByText} = render(
      <App component={PlayScreen.Component} options={PlayScreen.options} />,
    );

    expect(getByText('Round 1 (0)')).toBeDefined();
    await act(async () => {
      fireEvent.press(getByTestId('wasabi.AddButton'));
    });
    expect(getByText('Round 1 (1)')).toBeDefined();

    expect(getByTestId('SelectPlayerButton.Mary')).toBeDefined();
    await act(async () => {
      fireEvent.press(getByTestId('SelectPlayerButton.Mary'));
    });
    expect(getByText('Round 1 (0)')).toBeDefined();
  });
});
