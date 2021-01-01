import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {playMenuItemsMapSelector} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React from 'react';
import {FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

const Component = () => {
  const navigation = useNavigation();
  const playMenuItems = useSelector(playMenuItemsMapSelector);

  const start = () => {
    navigation.navigate('PlayerAddScreen');
  };

  const hasGame = !R.isEmpty(playMenuItems);

  return (
    <Screen>
      {!hasGame && (
        <StartButton testID="StartButton" icon="plus" onPress={start} />
      )}
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
  margin: 24px 24px 24px 24px;
  right: 0px;
  bottom: 0px;
  background-color: ${colors.primary};
`;
