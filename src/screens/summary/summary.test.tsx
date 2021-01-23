import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '@store';
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

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));

const defaultParams = {
  startDate: undefined,
  playerRankings: [],
  gameName: 'GAME_NAME',
  headers: [],
};

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
      Then I should see 'Best of GAME_NAME'`, async () => {
    const {getByText} = render(
      <App
        component={SummaryScreen.Component}
        options={SummaryScreen.options}
        initialParams={defaultParams}
      />,
    );
    await act(async () => {});

    expect(getByText('Best of GAME_NAME')).toBeDefined();
  });

  it(`Scenario: 3 Players
      Given that I have 3 players 'ME', 'John' 'Mary'
      When I am at Summary Screen
      Then I should see 'Top Three Player' 'ME' 'John' 'Mary'`, async () => {
    const categories = [
      {name: '1', categoryName: '1', value: '0', isNumeric: true},
      {name: '2', categoryName: '2', value: '50'},
    ];
    const playerRankings = [
      {categories, id: 'ME', name: 'ME', rank: 1, totalScore: '0'},
      {categories, id: 'John', name: 'John', rank: 2, totalScore: '50'},
      {categories, id: 'Mary', name: 'Mary', rank: 3, totalScore: '100'},
    ];
    const headers = [{title: 'Player'}, {title: 'Total', isNumeric: true}];
    const params = {
      ...defaultParams,
      startDate: new Date(),
      playerRankings,
      headers,
    };

    const {getByTestId} = render(
      <App
        component={SummaryScreen.Component}
        options={SummaryScreen.options}
        initialParams={params}
      />,
    );
    await act(async () => {});

    expect(getByTestId('TopThreePlayer.ME')).toBeDefined();
    expect(getByTestId('TopThreePlayer.John')).toBeDefined();
    expect(getByTestId('TopThreePlayer.Mary')).toBeDefined();
  });
});
