import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import {Provider as ReduxProvider} from 'react-redux';
import MenuAddScreen from './menu-add';

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

describe('Menu Add Screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Scenario: See UI
      Given I have not added any menu item previously
      When I am at 'Menu Add Screen'
      Then I should see 'What is on the menu?'
      And I should see 'Choose 1 rolls (0)'
      And I should see 'TEMAKI'
      And I should see 'URAMAKI'
      And I should see 'MAKI'
      And I should see 'Next Button'`, async () => {
    const {getByTestId, getByText} = render(
      <App
        component={MenuAddScreen.Component}
        options={MenuAddScreen.options}
      />,
    );
    await act(async () => {});

    expect(getByText('What is on the menu?')).toBeDefined();
    expect(getByText('Choose 1 rolls (0)')).toBeDefined();
    expect(getByText('TEMAKI')).toBeDefined();
    expect(getByText('URAMAKI')).toBeDefined();
    expect(getByText('MAKI')).toBeDefined();
    expect(getByTestId('NextButton')).toBeDefined();
  });

  it(`Scenario: Back
      Given that I am at 'Menu Add Screen'
      When I press 'Back Button'
      Then I should go back to previous screen`, async () => {
    mockCanGoBack.mockReturnValue(true);
    const {getByTestId} = render(
      <App
        component={MenuAddScreen.Component}
        options={MenuAddScreen.options}
      />,
    );
    await act(async () => {});

    fireEvent.press(getByTestId('BackButton'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it(`Scenario: Select Menu Item
      Given that I am at 'Menu Add Screen'
      And that 'TEMAKI' is 'unselected'
      When I press 'TEMAKI'
      Then I should see 'TEMAKI' 'selected'`, async () => {
    const {getByText, getByTestId} = render(
      <App
        component={MenuAddScreen.Component}
        options={MenuAddScreen.options}
      />,
    );
    await act(async () => {});
    expect(getByTestId('TEMAKI.Unselected')).toBeDefined();

    fireEvent.press(getByText('TEMAKI'));
    expect(getByTestId('TEMAKI.Selected')).toBeDefined();
  });

  it(`Scenario: Next with correct items is selected
      Given that I am at 'Menu Add Screen'
      And that items is correctly selected
      When I press 'Next Button'
      Then I should see 'Play Screen'
      And I should see 'items'`, async () => {
    const spyDispatch = jest.spyOn(store, 'dispatch');

    const {getByText, getByTestId} = render(
      <App
        component={MenuAddScreen.Component}
        options={MenuAddScreen.options}
        initialParams={{playerName: 'John'}}
      />,
    );

    fireEvent.press(getByText('TEMAKI'));
    fireEvent.press(getByText('SOY SAUCE'));
    fireEvent.press(getByText('WASABI'));
    fireEvent.press(getByText('ONIGIRI'));
    fireEvent.press(getByText('EDAMAME'));
    fireEvent.press(getByText('TEMPURA'));
    fireEvent.press(getByText('PUDDING'));
    await act(async () => {
      expect(mockNavigate).toHaveBeenCalledTimes(0);
      fireEvent.press(getByTestId('NextButton'));
    });
    expect(mockNavigate).toBeCalledWith('GameScreen');

    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledWith({
      payload: [
        'temaki',
        'soySauce',
        'wasabi',
        'onigiri',
        'edamame',
        'tempura',
        'pudding',
      ],
      type: 'game/startGame',
    });
  });

  it(`Scenario: Next with no items selected
      Given that I am at 'Menu Add Screen'
      And that items is incorrectly selected
      When I press 'Next Button'
      Then I should not see 'Play Screen'
      And I should see 'Error Message' 'Please choose exactly 1 rolls'
      And I should see 'Error Message' 'Please choose exactly 2 specials'
      And I should see 'Error Message' 'Please choose exactly 3 appetizers'
      And I should see 'Error Message' 'Please choose exactly 1 desserts'`, async () => {
    const {getByText, getByTestId} = render(
      <App
        component={MenuAddScreen.Component}
        options={MenuAddScreen.options}
      />,
    );
    await act(async () => {
      fireEvent.press(getByTestId('NextButton'));
    });

    expect(mockNavigate).not.toHaveBeenCalledTimes(1);

    expect(getByText('Please choose exactly 1 rolls')).toBeDefined();
    expect(getByText('Please choose exactly 2 specials')).toBeDefined();
    expect(getByText('Please choose exactly 3 appetizers')).toBeDefined();
    expect(getByText('Please choose exactly 1 desserts')).toBeDefined();
  });
});
