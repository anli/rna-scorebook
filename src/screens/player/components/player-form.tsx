import React from 'react';
import {Controller} from 'react-hook-form';
import {Button, Card, HelperText, TextInput, Title} from 'react-native-paper';
import styled from 'styled-components/native';

const PlayerForm = ({
  title,
  control,
  errors,
  onDismiss,
  handleSubmit,
  onSubmit,
}: any) => {
  return (
    <Dialog>
      <Card.Content>
        <Title>{title}</Title>
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
        <CancelButton testID="CancelButton" onPress={onDismiss}>
          Cancel
        </CancelButton>
        <Button
          testID="ConfirmButton"
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          Confirm
        </Button>
      </Buttons>
    </Dialog>
  );
};

export default PlayerForm;

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
