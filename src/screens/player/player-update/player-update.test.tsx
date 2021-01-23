import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getStore} from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import {Provider as ReduxProvider} from 'react-redux';
import PlayerUpdateScreen from './player-update';

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

describe('Player Update Screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Scenario: See UI
      Given that selected player is 'John'
      When I am at Player Update Screen
      Then I should see 'Change John to?'
      And I should see 'Name Input'
      And I should see 'Cancel Button'
      And I should see 'Confirm Button'`, async () => {
    const {getByTestId, getByText} = render(
      <App
        component={PlayerUpdateScreen.Component}
        options={PlayerUpdateScreen.options}
        initialParams={{id: 'JOHN_ID', name: 'John'}}
      />,
    );
    await act(async () => {});

    expect(getByText('Change John to?')).toBeDefined();
    expect(getByTestId('NameInput')).toBeDefined();
    expect(getByTestId('CancelButton')).toBeDefined();
    expect(getByTestId('ConfirmButton')).toBeDefined();
  });

  it(`Scenario: Cancel
      Given that I am at Player Update Screen
      When I press 'Cancel Button'
      Then I should go back to previous screen`, async () => {
    mockCanGoBack.mockReturnValue(true);
    const {getByTestId} = render(
      <App
        component={PlayerUpdateScreen.Component}
        options={PlayerUpdateScreen.options}
        initialParams={{id: 'JOHN_ID', name: 'John'}}
      />,
    );
    await act(async () => {});

    fireEvent.press(getByTestId('CancelButton'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it(`Scenario: Enter name of player
      Given that I am at Player Update Screen
      When I enter 'Mary' to 'Name Input'
      Then I should see 'Mary' in 'Name Input'
      And I press 'Confirm Button'
      And I should see 'Game Screen'
      And I should see 'Mary'`, async () => {
    mockCanGoBack.mockReturnValue(true);

    const {getByTestId} = render(
      <App
        component={PlayerUpdateScreen.Component}
        options={PlayerUpdateScreen.options}
        initialParams={{id: 'JOHN_ID', name: 'John', type: 'game/addPlayer'}}
        storeOptions={{
          preloadedState: {
            game: {players: [{id: 'JOHN_ID', name: 'John'}]},
          },
        }}
      />,
    );

    fireEvent(getByTestId('NameInput'), 'onChangeText', 'Mary');
    await act(async () => {
      fireEvent.press(getByTestId('ConfirmButton'));
    });
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it(`Scenario: Did not enter name of player Button
      Given that I am at Player Update Screen
      When I enter '' to 'Name Input'
      And I press 'Confirm Button'
      Then I should see 'Error Message' 'Please enter your name first'`, async () => {
    const {getByTestId, getByText} = render(
      <App
        component={PlayerUpdateScreen.Component}
        options={PlayerUpdateScreen.options}
        initialParams={{id: 'JOHN_ID', name: 'John'}}
      />,
    );

    fireEvent(getByTestId('NameInput'), 'onChangeText', '');
    await act(async () => {
      fireEvent.press(getByTestId('ConfirmButton'));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(0);
    expect(getByText('Please enter your name first')).toBeDefined();
  });
});
