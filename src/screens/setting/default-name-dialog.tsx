import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Button,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import styled from 'styled-components/native';

type FormData = {
  defaultName: string;
};

interface Props {
  onDismiss: () => any;
  visible: boolean;
  onConfirm: (data: FormData) => any;
  testID: string;
}

const DefaultNameDialog = ({onDismiss, visible, onConfirm, testID}: Props) => {
  const {control, handleSubmit, errors} = useForm<FormData>();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>What is your default name?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This will be the default player in future games</Paragraph>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <NameInput
                error={Boolean(errors.defaultName)}
                testID={`${testID}.NameInput`}
                autoCapitalize="none"
                autoCompleteType="name"
                autoCorrect={false}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="defaultName"
            rules={{required: 'Please enter your name first'}}
            defaultValue=""
          />
          <HelperText type="error" visible={Boolean(errors.defaultName)}>
            {errors?.defaultName?.message}
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            testID={`${testID}.ConfirmButton`}
            onPress={handleSubmit(onConfirm)}>
            Confirm
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export const useDefaultNameDialog = () => {
  const [visible, setVisible] = useState(false);

  const dismiss = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

  return {
    visible,
    dismiss,
    show,
  };
};

export default DefaultNameDialog;

const NameInput = styled(TextInput)`
  margin-bottom: 8px;
  background-color: white;
`;
