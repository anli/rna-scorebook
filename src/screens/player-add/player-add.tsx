import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from '@theme';
import React, {useEffect} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {Appbar, Button, FAB, TextInput} from 'react-native-paper';
import styled from 'styled-components/native';

const Component = () => {
  const navigation = useNavigation();
  const {control} = useForm();
  const {fields, append} = useFieldArray({
    control,
    name: 'player',
  });

  const back = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  useEffect(() => {
    append({name: ''});
  }, [append]);

  const addPlayer = async () => {
    append({name: ''});
  };

  return (
    <Screen>
      <AppBarHeader>
        <Appbar.BackAction testID="BackButton" onPress={back} />
        <Appbar.Content title="Who is playing?" />
      </AppBarHeader>

      <Body showsVerticalScrollIndicator={false}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            render={({onChange, onBlur, value}) => (
              <PlayerNameInput
                testID={`NameInput.[${index}]`}
                autoCapitalize="none"
                autoCompleteType="name"
                autoCorrect={false}
                mode="outlined"
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={(newValue) => onChange(newValue)}
                value={value}
              />
            )}
            name={`player[${index}].name`}
            rules={{}}
            defaultValue={field.name}
          />
        ))}
        <PlayerAddButton
          testID="AddPlayerButton"
          uppercase={false}
          mode="outlined"
          onPress={addPlayer}>
          Add Player
        </PlayerAddButton>
      </Body>
      <NextButton testID="NextButton" icon="arrow-right" />
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

const AppBarHeader = styled(Appbar.Header)`
  background-color: transparent;
`;

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

const PlayerAddButton = styled(Button)`
  padding: 4px 4px 4px 4px;
  margin-top: 16px;
  margin-bottom: 24px;
`;
