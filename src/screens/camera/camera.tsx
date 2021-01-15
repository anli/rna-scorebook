import {Header} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import store, {allMenuItems, playSlice} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React, {useState} from 'react';
import {
  RNCamera as NativeRNCamera,
  TrackedTextFeature,
} from 'react-native-camera';
import {Button, Chip, FAB} from 'react-native-paper';
import styled from 'styled-components/native';

const allMenuItemNames = allMenuItems.map(({name}) => name);

const Component = () => {
  const navigation = useNavigation();
  const [validTexts, setValidTexts] = useState<string[]>([]);
  const [canTextRecognize, setCanTextRecognize] = useState<boolean>(false);
  const {params}: {params: {playerName: string}} = useRoute<any>();

  const onTextRecognized = async ({
    textBlocks,
  }: {
    textBlocks: TrackedTextFeature[];
  }) => {
    const validTextBlocks = textBlocks.filter((textBlock) => {
      const validItems = textBlock.components.filter(
        (textLine) =>
          textLine.type === 'line' && allMenuItemNames.includes(textLine.value),
      );
      return validItems.length > 0;
    });
    const texts = validTextBlocks.map((textBlock) => textBlock.value);

    if (texts.length === 7) {
      const menuItems = allMenuItems.filter(({name}) => texts.includes(name));
      setCanTextRecognize(false);
    }
    return setValidTexts(texts);
  };

  const menuItems = allMenuItems.filter(({name}) => validTexts.includes(name));

  const onStart = () => {
    setValidTexts([]);
    setCanTextRecognize(true);
  };

  const canNext = menuItems.length === 7 && !canTextRecognize;
  const canStart = menuItems.length !== 7;

  const onNext = () => {
    const isValid = getIsValid(menuItems);

    if (isValid) {
      const pickedMap: {[key: string]: boolean} = menuItems.reduce(
        (acc, item) => ({...acc, [item.id]: true}),
        {},
      );
      store.dispatch(
        playSlice.actions.setPlayersMap({[params.playerName]: true}),
      );
      store.dispatch(playSlice.actions.setMenuItemsMap(pickedMap));
      navigation.navigate('PlayScreen');
    }
  };

  const onBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <>
      <Screen>
        <Header onBack={onBack} title="Scan your game board" />
        <RNCamera
          onTextRecognized={canTextRecognize ? onTextRecognized : undefined}
          captureAudio={false}
        />
        <Footer>
          <Items>
            {menuItems.map(({name}) => (
              <Item key={name}>{name}</Item>
            ))}
          </Items>
        </Footer>
        <Buttons>
          {canStart && (
            <StartButton
              icon="scan-helper"
              onPress={onStart}
              loading={canTextRecognize}
            />
          )}
          {canNext && (
            <>
              <TryAgainButton
                color={colors.primary}
                mode="outlined"
                onPress={onStart}>
                Try Again
              </TryAgainButton>
              <NextButton
                color={colors.primary}
                mode="contained"
                onPress={onNext}>
                Confirm
              </NextButton>
            </>
          )}
        </Buttons>
      </Screen>
    </>
  );
};

const options = {
  headerShown: false,
};

export default class SettingScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const RNCamera = styled(NativeRNCamera)`
  flex: 1;
`;

const Footer = styled.View`
  margin: 24px 24px 24px 24px;
`;

const StartButton = styled(FAB)`
  align-self: center;
  bottom: 0px;
  background-color: ${colors.primary};
`;

const Items = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Item = styled(Chip)`
  margin: 4px 4px 4px 4px;
  border-color: ${colors.primary};
`;

const TryAgainButton = styled(Button)`
  margin-left: 8px;
  margin-right: 8px;
`;

const NextButton = styled(Button)`
  margin-left: 8px;
  margin-right: 8px;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`;

const getIsValid = (menuItems: {name: string; typeId: string}[]) => {
  const isValidCount = menuItems.length === 7;
  const isValidTypeRoll =
    R.filter(R.propEq('typeId', 'rolls'), menuItems).length === 1;
  const isValidTypeSpecial =
    R.filter(R.propEq('typeId', 'specials'), menuItems).length === 2;
  const isValidTypeAppetizer =
    R.filter(R.propEq('typeId', 'appetizers'), menuItems).length === 3;
  const isValidTypeDessert =
    R.filter(R.propEq('typeId', 'desserts'), menuItems).length === 1;
  return (
    isValidCount &&
    isValidTypeRoll &&
    isValidTypeSpecial &&
    isValidTypeAppetizer &&
    isValidTypeDessert
  );
};
