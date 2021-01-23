import {Player, ScoringCategory, ScoringConfig} from '@components';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {GameSelectors, gameSlice} from '@store';
import {getSummaryHeaders} from '@utils';
import R from 'ramda';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {Appbar} from 'react-native-paper';
import {Portal} from 'react-native-portalize';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import EmptyState from './empty-state';
import RoundsNative from './rounds';

type RoundId = 'round1' | 'round2' | 'round3';

const HasGame = () => {
  const navigation = useNavigation();
  const menuItemOptionsRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState<
    {menuItemId: string; roundId: RoundId} | undefined
  >(undefined);
  const type = useSelector(GameSelectors.type);
  const players = useSelector(GameSelectors.players);
  const selectedPlayerId = useSelector(GameSelectors.selectedPlayerId);
  const roundScores = useSelector(GameSelectors.roundScores);
  const menuItems = useSelector(GameSelectors.menuItems);
  const dispatch = useDispatch();
  const startDate = useSelector(GameSelectors.startDate);
  const playerRankings = useSelector(GameSelectors.playerRankings);

  const selectedMenuItem = R.find(
    R.propEq('id', selected?.menuItemId),
    menuItems,
  );

  const isSelectedPlayerMe = selectedPlayerId === 'ME';

  const onAddPlayer = () => {
    const actionType = gameSlice.actions.addPlayer.type;
    navigation.navigate('PlayerAddScreen', {type: actionType});
  };

  const onSelectMenuItem = (menuItemId: string, roundId: RoundId) => {
    setSelected({menuItemId, roundId});
    menuItemOptionsRef.current?.open();
  };

  const onSelectMenuItemOption = (
    roundId: RoundId,
    menuItemId: string,
    value: string,
  ) => {
    dispatch(
      gameSlice.actions.setScore({
        menuItemId,
        roundId,
        value,
      }),
    );
    menuItemOptionsRef.current?.close();
    setSelected(undefined);
  };

  const onSelectPlayer = (id: string) => {
    dispatch(gameSlice.actions.selectPlayer(id));
  };
  const onRemoveSelectedPlayer = () => {
    dispatch(gameSlice.actions.removeSelectedPlayer());
  };

  const onUpdateSelectedPlayer = () => {
    const {id, name} = R.find(R.propEq('id', selectedPlayerId), players) as {
      id: string;
      name: string;
    };
    const actionType = gameSlice.actions.updatePlayer.type;
    navigation.navigate('PlayerUpdateScreen', {id, name, type: actionType});
  };

  const onSummary = async () => {
    const headers = getSummaryHeaders(R.head(playerRankings)?.categories || []);

    await analytics().logEvent('game_summary');
    navigation.navigate('SummaryScreen', {
      startDate,
      gameName: type?.name,
      playerRankings,
      headers,
    });
  };

  return (
    <Screen>
      <AppBarHeader>
        <Appbar.Content title={type?.name} />
        {!isSelectedPlayerMe && (
          <>
            <Appbar.Action
              testID="RemoveSelectedPlayerButton"
              icon="account-cancel"
              onPress={onRemoveSelectedPlayer}
            />
          </>
        )}
        <>
          <Appbar.Action
            testID="UpdateSelectedPlayerButton"
            icon="account-details"
            onPress={onUpdateSelectedPlayer}
          />
          <Appbar.Action
            testID="SummaryButton"
            icon="poll"
            onPress={onSummary}
          />
        </>
      </AppBarHeader>
      <View>
        <Players horizontal showsHorizontalScrollIndicator={false}>
          <Player
            key="new-player"
            name="Add"
            score="+"
            color="white"
            selected={false}
            testID="AddPlayerButton"
            onPress={onAddPlayer}
          />
          {players?.map(({id, name, totalScore}) => (
            <Player
              key={id}
              name={name}
              score={totalScore}
              color="white"
              selected={id === selectedPlayerId}
              onPress={() => onSelectPlayer(id)}
              testID={`SelectPlayerButton.${id}`}
            />
          ))}
          <EndingPlayer />
        </Players>
      </View>
      <Rounds
        data={roundScores}
        render={(roundData, roundId) => {
          return (
            <Screen>
              <MenuItems>
                {roundData?.map(({name, score, id: menuItemId}) => (
                  <TouchableOpacity
                    testID={`MenuItemButton.${menuItemId}`}
                    key={menuItemId}
                    onPress={() => onSelectMenuItem(menuItemId, roundId)}>
                    <ScoringCategory
                      name={name}
                      value={score}
                      numberOfColumns={3}
                    />
                  </TouchableOpacity>
                ))}
              </MenuItems>
            </Screen>
          );
        }}
      />
      <Portal>
        <Modalize ref={menuItemOptionsRef} adjustToContentHeight>
          {!R.isNil(selected) && !R.isNil(selectedMenuItem?.scoreConfigMap) && (
            <ScoringConfig
              testID="MenuItemOption"
              question={selectedMenuItem?.scoreConfigMap.question}
              options={selectedMenuItem?.scoreConfigMap.options}
              onPress={(value) =>
                onSelectMenuItemOption(
                  selected.roundId,
                  selected.menuItemId,
                  value,
                )
              }
            />
          )}
        </Modalize>
      </Portal>
    </Screen>
  );
};

const Component = () => {
  const hasGame = Boolean(useSelector(GameSelectors.type));

  return (
    <>
      {hasGame && <HasGame />}
      {!hasGame && <EmptyState />}
    </>
  );
};

const options = {
  headerShown: false,
};

export default class GameScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const AppBarHeader = styled(Appbar.Header)`
  margin-left: 16px;
  background-color: transparent;
`;

const Players = styled.ScrollView`
  padding-left: 20px;
`;

const Rounds = styled(RoundsNative)`
  flex: 1;
`;

const MenuItems = styled.View`
  margin-top: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const EndingPlayer = styled.View`
  width: 40px;
`;
