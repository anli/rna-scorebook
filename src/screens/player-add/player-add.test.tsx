import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import PlayerAddScreen from './player-add';

const mockCanGoBack = jest.fn();
const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...(jest.requireActual('@react-navigation/native') as any),
    useNavigation: () => ({
      canGoBack: mockCanGoBack,
      goBack: mockGoBack,
      navigate: mockNavigate,
    }),
  };
});

const App = ({component, options, initialParams = {}}: any) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={component}
          options={options}
          initialParams={initialParams}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('Player Add Screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Scenario: See UI
      Given I have not added any player previously
      When I am at Player Add Screen
      Then I should see 'Who is playing?'
      And I should see 'Name Input'
      And I should see 'Back Button'
      And I should see 'Next Button'`, async () => {
    const {getByTestId, getByText} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />,
    );
    await act(async () => {});

    expect(getByText('Who is playing?')).toBeDefined();
    expect(getByTestId('NameInput')).toBeDefined();
    expect(getByTestId('BackButton')).toBeDefined();
    expect(getByTestId('NextButton')).toBeDefined();
  });

  it(`Scenario: Back
      Given that I am at Player Add Screen
      When I press 'Back Button'
      Then I should go back to previous screen`, async () => {
    mockCanGoBack.mockReturnValue(true);
    const {getByTestId} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />,
    );
    await act(async () => {});

    fireEvent.press(getByTestId('BackButton'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it(`Scenario: Enter name of player
      Given that I am at Player Add Screen
      When I enter 'John' to 'Name Input'
      Then I should see 'John' in 'Name Input'
      And I press 'Next Button'
      And I should see 'Menu Add Screen'`, async () => {
    const {getByTestId} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />,
    );

    fireEvent(getByTestId('NameInput'), 'onChangeText', 'John');
    await act(async () => {
      fireEvent.press(getByTestId('NextButton'));
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('MenuAddScreen', {
      playerName: 'John',
    });
  });

  it(`Scenario: Did not enter name of player Button
      Given that I am at Player Add Screen
      When I press 'Next Button'
      Then I should see 'Error Message' 'Please enter your name first'`, async () => {
    const {getByTestId, getByText} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('NextButton'));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(0);
    expect(getByText('Please enter your name first')).toBeDefined();
  });

  it(`Scenario: Add player to existing play
      Given that I have an existing play
      And I am at 'Play Screen'
      And I press 'Player Add Button'
      When I am at 'Player Add Screen'
      And I enter 'Mary' to 'Name Input'
      And I press 'Next Button'
      Then I should see 'Play Screen'
      And I should see 'Mary'`, async () => {
    const spyDispatch = jest.spyOn(store, 'dispatch');
    const {getByTestId} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
        initialParams={{mode: 'ADD_ONLY'}}
      />,
    );

    fireEvent(getByTestId('NameInput'), 'onChangeText', 'Mary');
    await act(async () => {
      fireEvent.press(getByTestId('NextButton'));
    });
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledWith({
      payload: 'Mary',
      type: 'play/addPlayer',
    });
  });
});
