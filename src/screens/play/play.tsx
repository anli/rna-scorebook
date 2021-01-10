import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import store, {PlaySelectors, playSlice} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React, {useEffect, useState} from 'react';
import {Alert, useWindowDimensions, View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import MenuItem from './menu-item';
import Player from './player';
import Rounds from './rounds';

const Component = () => {
  const {width: windowWidth} = useWindowDimensions();
  const navigation = useNavigation();
  const menuItems = useSelector(PlaySelectors.menuItems);
  const playersMap = useSelector(PlaySelectors.playersMap);
  const totalScoreMap: {[key: string]: number} = useSelector(
    PlaySelectors.totalScoreMap,
  );
  const scoresMap = useSelector(PlaySelectors.scoresMap);
  const roundsTotalScoreMap: {[key: string]: any} = useSelector(
    PlaySelectors.roundsTotalScoreMap,
  );
  const selectedPlayer = useSelector(PlaySelectors.selectedPlayer);
  const [roundId, setRoundId] = useState<string>('roundOne');

  useEffect(() => {
    const hasExactlyOnePlayer = Object.keys(playersMap).length === 1;
    if (hasExactlyOnePlayer) {
      store.dispatch(
        playSlice.actions.selectPlayer(
          R.head(Object.keys(playersMap)) as string,
        ),
      );
      return;
    }
  }, [playersMap]);

  const start = () => {
    navigation.navigate('PlayerAddScreen');
  };

  const hasGame = !R.isEmpty(menuItems) && !R.isEmpty(playersMap);

  const players = Object.keys(playersMap).map((playerName) => ({
    id: playerName,
    name: playerName,
    color: 'white',
  }));

  const canShowDeleteSelectedPlayerButton =
    selectedPlayer && players.length > 1;

  const rounds = [
    {
      id: 'roundOne',
      name: 'Round 1',
      score: roundsTotalScoreMap?.[selectedPlayer]?.['roundOne'] || 0,
    },
    {
      id: 'roundTwo',
      name: 'Round 2',
      score: roundsTotalScoreMap?.[selectedPlayer]?.['roundTwo'] || 0,
    },
    {
      id: 'roundThree',
      name: 'Round 3',
      score: roundsTotalScoreMap?.[selectedPlayer]?.['roundThree'] || 0,
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
    player: string,
  ) => {
    store.dispatch(
      playSlice.actions.adjustScore({
        roundId: currentRoundId,
        menuItemId,
        adjustment,
        player,
      }),
    );
  };

  const onReset = () => {
    Alert.alert('Start Over?', 'You cannot undo this.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          store.dispatch(playSlice.actions.reset());
        },
      },
    ]);
  };

  const onAddPlayer = () => {
    navigation.navigate('PlayerAddScreen', {mode: 'ADD_ONLY'});
  };

  const onSelectPlayer = (id: string) => {
    store.dispatch(playSlice.actions.selectPlayer(id));
  };

  const onDeleteSelectedPlayer = () => {
    return Alert.alert(`Remove ${selectedPlayer}?`, 'You cannot undo this.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          store.dispatch(playSlice.actions.deletePlayer(selectedPlayer)),
      },
    ]);
  };

  return (
    <Screen>
      {hasGame && (
        <>
          <AppBarHeader>
            <Appbar.Content title="Sushi Go Party!" />
            {canShowDeleteSelectedPlayerButton && (
              <Appbar.Action
                testID="SelectedPlayer.DeleteButton"
                icon="account-cancel"
                onPress={onDeleteSelectedPlayer}
              />
            )}
            <Appbar.Action
              testID="ResetButton"
              icon="undo-variant"
              onPress={onReset}
            />
          </AppBarHeader>

          <View>
            <Players horizontal showsHorizontalScrollIndicator={false}>
              <Player
                key="new-player"
                name="Add"
                score="+"
                color="white"
                selected={false}
                onPress={onAddPlayer}
                testID="AddPlayerButton"
              />
              {players.map(({id, name, color}) => (
                <Player
                  key={id}
                  name={name}
                  score={totalScoreMap?.[id]}
                  color={color}
                  selected={id === selectedPlayer}
                  onPress={() => onSelectPlayer(id)}
                  testID={`SelectPlayerButton.${id}`}
                />
              ))}
            </Players>
          </View>

          <Body showsVerticalScrollIndicator={false}>
            <Rounds data={rounds} testID="Round" onChange={onRoundChange} />
            <MenuItems>
              {menuItems.map(({id: menuItemId, name}) => {
                const score =
                  scoresMap?.[selectedPlayer]?.[roundId]?.[menuItemId] || 0;
                return (
                  <MenuItem
                    windowWidth={windowWidth}
                    key={menuItemId}
                    menuItemId={menuItemId}
                    name={name}
                    score={score}
                    onAddPress={() => {
                      onAdjustScore(
                        menuItemId,
                        roundId,
                        +getIncrement(menuItemId, score, true),
                        selectedPlayer,
                      );
                    }}
                    onReducePress={() => {
                      onAdjustScore(
                        menuItemId,
                        roundId,
                        -getIncrement(menuItemId, score, false),
                        selectedPlayer,
                      );
                    }}
                  />
                );
              })}
            </MenuItems>
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
  background-color: white;
`;

const Players = styled.ScrollView`
  padding-left: 12px;
`;

const Body = styled.ScrollView`
  flex: 1;
`;

const menuItemsIncrementMap: {[key: string]: null | number[]} = {
  eggNigiri: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  salmonNigiri: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
  squidNigiri: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  temaki: [-4, 0, 4],
  uramaki: [0, 2, 5, 8],
  maki: [0, 3, 6],
  soySauce: [0, 4, 8, 12, 16],
  wasabi: null,
  spoon: null,
  chopsticks: null,
  takeoutBox: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  tea: null,
  specialOrder: null,
  menu: null,
  onigiri: null,
  edamame: null,
  tempura: [0, 5, 10, 15, 20],
  misoSoup: [0, 3, 6, 9, 12, 15, 18, 21, 24],
  sashimi: [0, 10, 20],
  eel: [-3, 0, 7],
  dumpling: [0, 1, 3, 6, 10, 15],
  tofu: [0, 2, 6],
  pudding: [-6, 0, 6],
  fruit: null,
  greenTeaIceCream: [0, 4, 8, 12],
};

const getIncrement = (
  menuItemId: string,
  score: number,
  isIncrease: boolean,
) => {
  const scores = menuItemsIncrementMap?.[menuItemId];

  if (Array.isArray(scores)) {
    const nextScore = getNextScore(scores, score, isIncrease);
    return !R.isNil(nextScore) ? Math.abs(nextScore - score) : 0;
  }

  return 1;
};

const getNextScore = (
  scores: number[],
  currentScore: number,
  isIncrease: boolean,
) => {
  if (isIncrease) {
    return R.head(scores.filter((fixedScore) => fixedScore > currentScore));
  }
  return R.last(scores.filter((fixedScore) => fixedScore < currentScore));
};

const MenuItems = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 16px;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;
