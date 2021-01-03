import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import store, {PlaySelectors, playSlice} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar, FAB, IconButton, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Player from './player';
import Rounds from './rounds';

const Component = () => {
  const navigation = useNavigation();
  const menuItems = useSelector(PlaySelectors.menuItems);
  const playersMap = useSelector(PlaySelectors.playersMap);
  const totalScore = useSelector(PlaySelectors.totalScore);
  const scoresMap = useSelector(PlaySelectors.scoresMap);
  const roundsTotalScoreMap = useSelector(PlaySelectors.roundsTotalScoreMap);

  const [roundId, setRoundId] = useState<string>('roundOne');

  const start = () => {
    navigation.navigate('PlayerAddScreen');
  };

  const hasGame = !R.isEmpty(menuItems) && !R.isEmpty(playersMap);
  const players = Object.keys(playersMap).map((playerName) => ({
    id: playerName,
    name: playerName,
    color: 'white',
  }));

  const rounds = [
    {
      id: 'roundOne',
      name: 'Round 1',
      score: roundsTotalScoreMap?.['roundOne'] || 0,
    },
    {
      id: 'roundTwo',
      name: 'Round 2',
      score: roundsTotalScoreMap?.['roundTwo'] || 0,
    },
    {
      id: 'roundThree',
      name: 'Round 3',
      score: roundsTotalScoreMap?.['roundThree'] || 0,
    },
  ];
  roundsTotalScoreMap;

  const onRoundChange = ({id}: {id: string}) => {
    setRoundId(id);
  };

  const onAdjustScore = (
    menuItemId: string,
    currentRoundId: string,
    adjustment: number,
  ) => {
    store.dispatch(
      playSlice.actions.adjustScore({
        roundId: currentRoundId,
        menuItemId,
        adjustment,
      }),
    );
  };

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
                  score={totalScore}
                  color={color}
                  selected={true}
                />
              ))}
            </Players>
          </View>

          <Body showsVerticalScrollIndicator={false}>
            <Rounds data={rounds} testID="Round" onChange={onRoundChange} />
            {menuItems.map(({id: menuItemId, name}) => {
              const score = scoresMap?.[roundId]?.[menuItemId] || 0;
              return (
                <MenuItem
                  key={menuItemId}
                  title={`${name} (${score})`}
                  right={() => (
                    <Buttons>
                      <IconButton
                        testID={`${menuItemId}.AddButton`}
                        icon="plus"
                        onPress={() => onAdjustScore(menuItemId, roundId, +1)}
                      />
                      <IconButton
                        testID={`${menuItemId}.MinusButton`}
                        icon="minus"
                        onPress={() => onAdjustScore(menuItemId, roundId, -1)}
                      />
                    </Buttons>
                  )}
                />
              );
            })}
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

const MenuItem = styled(List.Item)`
  padding-left: 16px;
  padding-right: 24px;
`;

const Buttons = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
