import {Header} from '@components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from '@theme';
import React, {useState} from 'react';
import {View} from 'react-native';
import {FAB, HelperText, Subheading} from 'react-native-paper';
import styled from 'styled-components/native';
import MenuItem from './menu-item';
import useMenuItems from './use-menu-items';

const Component = () => {
  const navigation = useNavigation();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const back = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  const {
    groups,
    toggle,
    getIsPicked,
    pickedMap,
    getGroupIsPickedCount,
    isValid,
  } = useMenuItems();

  const next = () => {
    setIsSubmitted(true);

    if (isValid) {
      // store.dispatch(playSlice.actions.setMenuItemsMap(pickedMap));
      navigation.navigate('GameScreen');
    }
  };

  return (
    <Screen>
      <Header onBack={back} title="What is on the menu?" />

      <Body showsVerticalScrollIndicator={false}>
        {groups.map(({maxCount, name: groupName, items}) => {
          const isGroupValid = maxCount !== getGroupIsPickedCount(groupName);
          return (
            <View key={groupName}>
              <Subheading>
                Choose {maxCount} {groupName} (
                {getGroupIsPickedCount(groupName)})
              </Subheading>
              <ErrorMessage type="error" visible={isSubmitted && isGroupValid}>
                Please choose exactly {maxCount} {groupName}
              </ErrorMessage>
              <Section>
                {items.map(([id, itemName]) => (
                  <MenuItem
                    key={id}
                    id={id}
                    name={itemName}
                    onPress={toggle}
                    selected={getIsPicked(id)}
                  />
                ))}
              </Section>
            </View>
          );
        })}
      </Body>

      <NextButton testID="NextButton" icon="arrow-right" onPress={next} />
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

const Body = styled.ScrollView`
  flex: 1;
  padding: 0px 24px 0px 24px;
`;

const Section = styled.View`
  /* margin-top: 16px; */
  margin-bottom: 16px;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const ErrorMessage = styled(HelperText)`
  margin-left: -10px;
`;
