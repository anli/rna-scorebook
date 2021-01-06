import {Header} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import store, {playSlice} from '@store';
import {colors} from '@theme';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {FAB, HelperText, TextInput} from 'react-native-paper';
import styled from 'styled-components/native';

type FormData = {
  playerName: string;
};

const Component = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm<FormData>();
  const {params}: {params: {mode: string}} = useRoute<any>();
  const isAddOnlyMode = params?.mode === 'ADD_ONLY';

  const back = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  const next = ({playerName}: FormData) => {
    if (isAddOnlyMode) {
      store.dispatch(playSlice.actions.addPlayer(playerName));
      return back();
    }

    return navigation.navigate('MenuAddScreen', {playerName});
  };

  return (
    <Screen>
      <Header onBack={back} title="Who is playing?" />

      <Body showsVerticalScrollIndicator={false}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <PlayerNameInput
              error={Boolean(errors.playerName)}
              testID="NameInput"
              autoCapitalize="none"
              autoCompleteType="name"
              autoCorrect={false}
              mode="outlined"
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="playerName"
          rules={{required: 'Please enter your name first'}}
          defaultValue=""
        />
        <HelperText type="error" visible={Boolean(errors.playerName)}>
          {errors?.playerName?.message}
        </HelperText>
      </Body>
      <NextButton
        testID="NextButton"
        icon="arrow-right"
        onPress={handleSubmit(next)}
      />
    </Screen>
  );
};

const options = {
  headerShown: false,
};

export default class PlayerScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const NextButton = styled(FAB)`
  position: absolute;
  margin: 24px 24px 24px 24px;
  right: 0px;
  bottom: 0px;
  background-color: ${colors.primary};
`;

const PlayerNameInput = styled(TextInput)`
  margin-bottom: 8px;
`;

const Body = styled.ScrollView`
  flex: 1;
  padding: 0px 24px 0px 24px;
`;
