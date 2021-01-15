import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, HelperText, TextInput, Title} from 'react-native-paper';
import styled from 'styled-components/native';

type FormData = {
  playerName: string;
};

const Component = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm<FormData>();

  const onDismiss = () => {
    navigation.canGoBack() && navigation.goBack();
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
          <Button mode="contained" onPress={handleSubmit(onDismiss)}>
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
  cardStyleInterpolator: ({current: {progress}}: any) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

export default class PlayerScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
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
