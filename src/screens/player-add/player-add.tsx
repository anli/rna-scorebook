import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {gameSlice} from '@store';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, HelperText, TextInput, Title} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

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
      <Dialog>
        <Card.Content>
          <Title>What is the player name?</Title>
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
        </Card.Content>
        <Buttons>
          <CancelButton onPress={onDismiss}>Cancel</CancelButton>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </Buttons>
      </Dialog>
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

const PlayerNameInput = styled(TextInput)`
  background-color: white;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Dialog = styled(Card)`
  margin-left: 24px;
  margin-right: 24px;
  padding: 16px 16px 16px 16px;
`;

const Buttons = styled(Card.Actions)`
  justify-content: flex-end;
`;

const CancelButton = styled(Button)`
  margin: 0px 8px 0px 8px;
`;
