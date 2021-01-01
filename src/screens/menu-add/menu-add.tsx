import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import store, {playMenuItemsMapSlice} from '@store';
import {colors} from '@theme';
import React from 'react';
import {Appbar, FAB, IconButton, Subheading} from 'react-native-paper';
import styled from 'styled-components/native';
import MenuItem from './menu-item';
import useMenuItems from './use-menu-items';

const Component = () => {
  const navigation = useNavigation();

  const back = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  const {
    rolls,
    specials,
    appetizers,
    desserts,
    toggle,
    getIsPicked,
    pickedMap,
  } = useMenuItems();

  const next = () => {
    store.dispatch(playMenuItemsMapSlice.actions.set(pickedMap));
    navigation.navigate('PlayScreen');
  };

  return (
    <Screen>
      <AppBarHeader>
        <BackButton testID="BackButton" icon="arrow-left" onPress={back} />
        <Appbar.Content title="What is on the menu?" />
      </AppBarHeader>

      <Body showsVerticalScrollIndicator={false}>
        <Subheading>Choose 1 Roll</Subheading>

        <Section>
          {rolls.map(([id, name]) => (
            <MenuItem
              key={id}
              id={id}
              name={name}
              onPress={toggle}
              selected={getIsPicked(id)}
            />
          ))}
        </Section>

        <Subheading>Choose 2 Specials</Subheading>

        <Section>
          {specials.map(([id, name]) => (
            <MenuItem
              key={id}
              id={id}
              name={name}
              onPress={toggle}
              selected={getIsPicked(id)}
            />
          ))}
        </Section>

        <Subheading>Choose 3 Appetizers</Subheading>

        <Section>
          {appetizers.map(([id, name]) => (
            <MenuItem
              key={id}
              id={id}
              name={name}
              onPress={toggle}
              selected={getIsPicked(id)}
            />
          ))}
        </Section>

        <Subheading>Choose 1 Dessert</Subheading>

        <Section>
          {desserts.map(([id, name]) => (
            <MenuItem
              key={id}
              id={id}
              name={name}
              onPress={toggle}
              selected={getIsPicked(id)}
            />
          ))}
        </Section>
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

const Body = styled.ScrollView`
  flex: 1;
  padding: 0px 24px 0px 24px;
`;

const Section = styled.View`
  margin-top: 16px;
  margin-bottom: 16px;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const BackButton = styled(IconButton)`
  margin-left: 10px;
`;
