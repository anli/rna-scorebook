import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeScreen} from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen.Component}
          options={HomeScreen.options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
