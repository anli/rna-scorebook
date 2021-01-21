import {StackNavigationOptions} from '@react-navigation/stack';
import {ScytheData, ScytheSelectors, scytheSlice} from '@scythe';
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Appbar} from 'react-native-paper';
import {Host, Portal} from 'react-native-portalize';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Player from './player';
import ScoringCategory from './scoring-category';
import ScoringConfig from './scoring-config';

const Component = () => {
  const game = ScytheData.game;
  const selectedPlayerId = useSelector(ScytheSelectors.selectedPlayerId);
  const players = useSelector(ScytheSelectors.players);
  const scoringCategories = useSelector(ScytheSelectors.scoringCategories);
  const scoringConfigRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState<
    {id: string; config: any} | undefined
  >(undefined);
  const dispatch = useDispatch();

  const onSelectScoringCategory = async (id: string, config: any) => {
    await setSelected({id, config});
    scoringConfigRef.current?.open();
  };

  const onSelectScoringConfig = (value: string) => {
    const scoreCategoryId = selected?.id as string;
    dispatch(scytheSlice.actions.setScore({value, scoreCategoryId}));
    scoringConfigRef.current?.close();
  };

  const onAddPlayer = () => {
    dispatch(scytheSlice.actions.start());
  };

  const scoreConfig = selected?.config;

  return (
    <Host>
      <Screen>
        <AppBarHeader>
          <Appbar.Content title={game.name} />
          <>
            <Appbar.Action
              testID="RemoveSelectedPlayerButton"
              icon="account-cancel"
              disabled={selectedPlayerId === 'ME'}
            />
            <Appbar.Action
              testID="UpdateSelectedPlayerButton"
              icon="account-details"
            />
            <Appbar.Action testID="SummaryButton" icon="poll" />
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
                testID={`SelectPlayerButton.${id}`}
              />
            ))}
            <EndingPlayer />
          </Players>
        </View>
        <ScoringCategories>
          {scoringCategories?.map(({name, value, id, config}) => (
            <TouchableOpacity
              testID={`ScoringCategoryButton.${id}`}
              key={id}
              onPress={() => onSelectScoringCategory(id, config)}>
              <ScoringCategory name={name} value={value} />
            </TouchableOpacity>
          ))}
        </ScoringCategories>
        <Portal>
          <Modalize ref={scoringConfigRef} adjustToContentHeight>
            {Boolean(scoreConfig) && (
              <ScoringConfig
                testID="ScoringConfig"
                question={scoreConfig.question}
                options={scoreConfig.options}
                onPress={onSelectScoringConfig}
              />
            )}
          </Modalize>
        </Portal>
      </Screen>
    </Host>
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

const EndingPlayer = styled.View`
  width: 40px;
`;

const ScoringCategories = styled.View`
  margin-top: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;
