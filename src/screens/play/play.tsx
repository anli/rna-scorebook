import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {PlaySelectors} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React from 'react';
import {View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Player from './player';
import Round from './round';

const Component = () => {
  const navigation = useNavigation();
  const menuItemsMap = useSelector(PlaySelectors.menuItemsMap);
  const playersMap = useSelector(PlaySelectors.playersMap);
  const totalScoresMap = useSelector(PlaySelectors.totalScoresMap);

  const start = () => {
    navigation.navigate('PlayerAddScreen');
  };

  const hasGame = !R.isEmpty(menuItemsMap) && !R.isEmpty(playersMap);
  const players = Object.keys(playersMap).map((playerName) => ({
    id: playerName,
    name: playerName,
    color: 'white',
  }));
  const rounds = ['Round 1', 'Round 2', 'Round 3'];

  return (
    <Screen>
      {hasGame && (
        <>
          <AppBarHeader>
            <Appbar.Content title="Sushi Go Party!" />
          </AppBarHeader>

          <View>
            <Players horizontal showsHorizontalScrollIndicator={false}>
              {players.map(({id, name, color}) => (
                <Player
                  key={id}
                  name={name}
                  score={totalScoresMap?.[id] || 0}
                  color={color}
                  selected={true}
                />
              ))}
            </Players>
          </View>

          <Body showsVerticalScrollIndicator={false}>
            <Round data={rounds} testID="Round" />
          </Body>
        </>
      )}
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

const AppBarHeader = styled(Appbar.Header)`
  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
`;

const Players = styled.ScrollView`
  padding-left: 12px;
`;

const Body = styled.ScrollView`
  flex: 1;
`;
