import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import store, {PlaySelectors, playSlice, UserSelectors} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Appbar, FAB} from 'react-native-paper';
import {Portal} from 'react-native-portalize';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import MenuItem from './menu-item';
import MenuItemOptions from './menu-item-options';
import Player from './player';

const Component = () => {
  const navigation = useNavigation();
  const allMenuItems = useSelector(PlaySelectors.menuItems);
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
  const selectedMenuItemOptionsRef = useRef<Modalize>(null);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<
    undefined | string
  >(undefined);
  const defaultName = useSelector(UserSelectors.defaultName);

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

  const menuItems = getMenuItemForRound(allMenuItems, roundId);

  const hasGame = !R.isEmpty(menuItems) && !R.isEmpty(playersMap);

  const players = Object.keys(playersMap).map((playerName) => ({
    id: playerName,
    name: playerName,
    color: 'white',
  }));

  const canShowDeleteSelectedPlayerButton =
    !R.isNil(selectedPlayer) && players.length > 1;

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
  const roundIndex = R.findIndex(R.propEq('id', roundId), rounds);
  const canShowPreviousRound = roundIndex !== 0;
  const canShowNextRound = roundIndex !== rounds.length - 1;

  const selectedMenuItem = R.find(
    R.propEq('id', selectedMenuItemId),
    menuItems,
  ) as any;

  const hasDefaultName = !R.isNil(defaultName);

  const start = () => {
    return navigation.navigate('PlayerAddScreen');
  };

  const onMenuAdd = () => {
    return navigation.navigate('MenuAddScreen', {playerName: defaultName});
  };

  const onNextRound = () => {
    const round = rounds[roundIndex + 1];
    return round && setRoundId(round.id);
  };

  const onPreviousRound = () => {
    const round = rounds[roundIndex - 1];
    return round && setRoundId(round.id);
  };

  const onPressMenuItem = async (menuItemId: string) => {
    await setSelectedMenuItemId(menuItemId);
    selectedMenuItemOptionsRef.current?.open();
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

  const onSelectMenuItemOption = (menuItemId: string, value: number) => {
    store.dispatch(
      playSlice.actions.setScore({
        menuItemId,
        player: selectedPlayer,
        roundId,
        score: value,
      }),
    );
    selectedMenuItemOptionsRef.current?.close();
  };

  return (
    <Screen>
      {hasGame && (
        <>
          <AppBarHeader>
            <Appbar.Action
              testID="ResetButton"
              icon="close"
              onPress={onReset}
            />
            <Appbar.Content title={getRoundSummary(rounds, roundId)} />
            {canShowDeleteSelectedPlayerButton && (
              <Appbar.Action
                testID="SelectedPlayer.DeleteButton"
                icon="account-cancel"
                onPress={onDeleteSelectedPlayer}
              />
            )}
            <Appbar.Action
              disabled={!canShowPreviousRound}
              icon="arrow-left"
              onPress={onPreviousRound}
              testID="Round.PreviousButton"
            />
            <Appbar.Action
              disabled={!canShowNextRound}
              icon="arrow-right"
              onPress={onNextRound}
              testID="Round.NextButton"
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
            <MenuItems key={`MenuItems.${menuItems.length}`}>
              {menuItems.map(({id: menuItemId, name}) => {
                const score =
                  scoresMap?.[selectedPlayer]?.[roundId]?.[menuItemId] || 0;
                return (
                  <MenuItem
                    key={menuItemId}
                    name={name}
                    score={score}
                    testID={`${menuItemId}.ScoreOptionsButton`}
                    onPress={() => onPressMenuItem(menuItemId)}
                  />
                );
              })}
            </MenuItems>
          </Body>
          <Portal>
            <Modalize ref={selectedMenuItemOptionsRef} adjustToContentHeight>
              {!R.isNil(selectedMenuItemId) && (
                <MenuItemOptions
                  testID="MenuItemOption"
                  id={selectedMenuItemId}
                  question={`${selectedMenuItem?.scoreConfigMap?.question}`}
                  options={selectedMenuItem?.scoreConfigMap?.options}
                  onPress={onSelectMenuItemOption}
                />
              )}
            </Modalize>
          </Portal>
        </>
      )}
      {!hasGame && (
        <>
          {hasDefaultName && (
            <StartButton
              label="Select Menu"
              testID="MenuAddButton"
              icon="plus"
              onPress={onMenuAdd}
            />
          )}
          {!hasDefaultName && (
            <StartButton testID="StartButton" icon="plus" onPress={start} />
          )}
        </>
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

const MenuItems = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 16px;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const getMenuItemForRound = (menuItems: any[], roundId: string) => {
  const menuItemWithScoreConfig = R.filter(
    ({scoreConfigMap}) => !R.isNil(scoreConfigMap),
    menuItems,
  );

  if (roundId === 'roundThree') {
    return menuItemWithScoreConfig;
  }

  return R.init(menuItemWithScoreConfig);
};

const getRoundSummary = (
  rounds: {id: string; name: string; score: number}[],
  roundId: string,
) => {
  const round = R.find(R.propEq('id', roundId), rounds);
  return `${round?.name} (${round?.score})`;
};
