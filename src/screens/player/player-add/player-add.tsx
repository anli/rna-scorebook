import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {gameSlice} from '@store';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {PlayerForm} from '../components';

type FormData = {
  playerName: string;
};

const Component = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm<FormData>();

  const onDismiss = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  const onSubmit = ({playerName}: FormData) => {
    dispatch(gameSlice.actions.addPlayer(playerName));
    onDismiss();
  };

  return (
    <Screen>
      <PlayerForm
        title="Who is playing?"
        control={control}
        errors={errors}
        onDismiss={onDismiss}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </Screen>
  );
};

const options = {
  cardStyle: {backgroundColor: 'transparent'},
  cardOverlayEnabled: true,
};

export default class PlayerScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: transparent;
`;
