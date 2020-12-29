import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from '@theme';
import React from 'react';
import {FAB} from 'react-native-paper';
import styled from 'styled-components/native';

const Component = () => {
  return (
    <Screen>
      <StartButton testID="StartButton" icon="plus" />
    </Screen>
  );
};

const options = {
  headerShown: false,
};

export default class PlayScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const StartButton = styled(FAB)`
  position: absolute;
  margin: 16px 16px 16px 16px;
  right: 0px;
  bottom: 0px;
  background-color: ${colors.primary};
`;
