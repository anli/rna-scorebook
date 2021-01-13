import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';

const Component = () => {
  return <Screen />;
};

const options = {
  headerShown: false,
};

export default class StartScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;
