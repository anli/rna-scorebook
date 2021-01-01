import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="App" component={component} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
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
      And I should see 'Choose 1 Roll'
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
    expect(getByText('Choose 1 Roll')).toBeDefined();
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

  it(`Scenario: Next
      Given that I am at 'Menu Add Screen'
      And that 'TEMAKI' is 'selected'
      When I press 'Next Button'
      Then I should see 'Play Screen'
      And I should see 'TEMAKI'`, async () => {
    const spyDispatch = jest.spyOn(store, 'dispatch');

    const {getByText, getByTestId} = render(
      <App
        component={MenuAddScreen.Component}
        options={MenuAddScreen.options}
      />,
    );
    await act(async () => {});

    fireEvent.press(getByText('TEMAKI'));
    fireEvent.press(getByTestId('NextButton'));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('PlayScreen');

    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledWith({
      payload: {
        temaki: true,
      },
      type: 'playMenuItemsMap/set',
    });
  });
});
