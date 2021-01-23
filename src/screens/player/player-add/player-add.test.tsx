import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import * as redux from 'react-redux';
import {Provider as ReduxProvider} from 'react-redux';
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
    <ReduxProvider store={store}>
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

describe('Player Add Screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Scenario: See UI
      Given I have not added any player previously
      When I am at Player Add Screen
      Then I should see 'Who is playing?'
      And I should see 'Name Input'
      And I should see 'Cancel Button'
      And I should see 'Confirm Button'`, async () => {
    const {getByTestId, getByText} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />,
    );
    await act(async () => {});

    expect(getByText('Who is playing?')).toBeDefined();
    expect(getByTestId('NameInput')).toBeDefined();
    expect(getByTestId('CancelButton')).toBeDefined();
    expect(getByTestId('ConfirmButton')).toBeDefined();
  });

  it(`Scenario: Cancel
      Given that I am at Player Add Screen
      When I press 'Cancel Button'
      Then I should go back to previous screen`, async () => {
    mockCanGoBack.mockReturnValue(true);
    const {getByTestId} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />,
    );
    await act(async () => {});

    fireEvent.press(getByTestId('CancelButton'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it(`Scenario: Enter name of player
      Given that I am at Player Add Screen
      When I enter 'John' to 'Name Input'
      Then I should see 'John' in 'Name Input'
      And I press 'Confirm Button'
      And I should see 'Game Screen'
      And I should see 'John'`, async () => {
    const params = {
      type: 'game/addPlayer',
    };
    mockCanGoBack.mockReturnValue(true);
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);

    const {getByTestId} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
        initialParams={params}
      />,
    );

    fireEvent(getByTestId('NameInput'), 'onChangeText', 'John');
    await act(async () => {
      fireEvent.press(getByTestId('ConfirmButton'));
    });
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: 'John',
      type: 'game/addPlayer',
    });
  });

  it(`Scenario: Did not enter name of player Button
      Given that I am at Player Add Screen
      When I press 'Confirm Button'
      Then I should see 'Error Message' 'Please enter your name first'`, async () => {
    const {getByTestId, getByText} = render(
      <App
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('ConfirmButton'));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(0);
    expect(getByText('Please enter your name first')).toBeDefined();
  });
});
