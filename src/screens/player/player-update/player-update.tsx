import analytics from '@react-native-firebase/analytics';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {gameSlice} from '@store';
import React, {useEffect} from 'react';
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
  const {control, handleSubmit, errors, setValue} = useForm<FormData>();
  const {
    params: {id, name},
  } = useRoute<any>();

  useEffect(() => {
    setValue('playerName', name);
  }, [name, setValue]);

  const onDismiss = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  const onSubmit = async ({playerName}: FormData) => {
    await analytics().logEvent('player_updated');
    dispatch(gameSlice.actions.updatePlayer({id, name: playerName}));
    onDismiss();
  };

  return (
    <Screen>
      <PlayerForm
        title={`Change ${name} to?`}
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
