import {Player, ScoreCategory} from '@components';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {AppSelectors, appSlice, GameSelectors, gameSlice} from '@store';
import {format} from 'date-fns';
import R from 'ramda';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {Appbar, Caption, Headline} from 'react-native-paper';
import {Portal} from 'react-native-portalize';
import {useDispatch, useSelector} from 'react-redux';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';
import styled from 'styled-components/native';
import EmptyState from './empty-state';
import MenuItemOptions from './menu-item-options';
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
  const {canStart, start, eventEmitter} = useTourGuideController();
  const hasOnboard = useSelector(AppSelectors.hasOnboard);
  const startDate = useSelector(GameSelectors.startDate);
  const isSelectedPlayerMe = selectedPlayerId === 'ME';

  /* istanbul ignore next */
  const handleOnStop = () => dispatch(appSlice.actions.onboard());

  useEffect(() => {
    !hasOnboard && canStart && start && start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canStart, hasOnboard]);

  const selectedMenuItem = R.find(
    R.propEq('id', selected?.menuItemId),
    menuItems,
  );

  React.useEffect(() => {
    eventEmitter && eventEmitter.on('stop', handleOnStop);

    return () => {
      eventEmitter && eventEmitter.off('stop', handleOnStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddPlayer = () => {
    navigation.navigate('PlayerAddScreen');
  };

  const onSelectMenuItem = (menuItemId: string, roundId: RoundId) => {
    setSelected({menuItemId, roundId});
    menuItemOptionsRef.current?.open();
  };

  const onSelectMenuItemOption = (
    roundId: RoundId,
    menuItemId: string,
    value: number,
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
    navigation.navigate('PlayerUpdateScreen', {id, name});
  };

  const onSummary = async () => {
    await analytics().logEvent('game_summary');
    navigation.navigate('SummaryScreen');
  };

  const onHelp = () => {
    start && start();
  };

  return (
    <Screen>
      <AppBarHeader>
        <Appbar.Content title="" />
        <>
          <Appbar.Action
            testID="HelpButton"
            icon="help-circle"
            onPress={onHelp}
          />
          <TourGuideZone
            zone={3}
            text={'You can delete the selected player, other than yourself'}>
            <Appbar.Action
              testID="RemoveSelectedPlayerButton"
              icon="account-cancel"
              disabled={isSelectedPlayerMe}
              onPress={onRemoveSelectedPlayer}
            />
          </TourGuideZone>
          <TourGuideZone zone={4} text={'You can rename them'}>
            <Appbar.Action
              testID="UpdateSelectedPlayerButton"
              icon="account-details"
              onPress={onUpdateSelectedPlayer}
            />
          </TourGuideZone>

          <TourGuideZone
            zone={6}
            text={'When you are done scoring, you can see a summary here'}>
            <Appbar.Action
              testID="SummaryButton"
              icon="poll"
              onPress={onSummary}
            />
          </TourGuideZone>
        </>
      </AppBarHeader>
      <Game>
        <Headline>{type?.name}</Headline>
        <Caption>{format(startDate, 'd LLL yyyy')}</Caption>
      </Game>
      <View>
        <TourGuideZone
          zone={2}
          text={'You can add new players here, or select existing ones'}>
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
        </TourGuideZone>
      </View>
      <Rounds
        data={roundScores}
        render={(roundData, roundId) => {
          return (
            <Screen>
              <MenuItems>
                {roundData?.map(
                  ({name, score: value, id: menuItemId, typeId}) => {
                    const isDisabled = getIsScoreCategoryDisabled(
                      typeId,
                      roundId,
                    );
                    return (
                      <TouchableOpacity
                        testID={`MenuItemButton.${menuItemId}`}
                        key={menuItemId}
                        onPress={() => onSelectMenuItem(menuItemId, roundId)}
                        disabled={isDisabled}>
                        <ScoreCategory
                          name={name}
                          value={value}
                          disabled={isDisabled}
                          numberOfColumns={3}
                        />
                      </TouchableOpacity>
                    );
                  },
                )}
              </MenuItems>
            </Screen>
          );
        }}
      />
      <Portal>
        <Modalize ref={menuItemOptionsRef} adjustToContentHeight>
          {!R.isNil(selected) && !R.isNil(selectedMenuItem?.scoreConfigMap) && (
            <MenuItemOptions
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

const getIsScoreCategoryDisabled = (typeId: string, roundId: string) => {
  return typeId === 'desserts' && roundId !== 'round3';
};

const Game = styled.View`
  padding-left: 28px;
  padding-right: 28px;
`;
