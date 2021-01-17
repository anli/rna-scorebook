import {BackButton} from '@components';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {allMenuItems, gameSlice} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React from 'react';
import {Vibration} from 'react-native';
import {RNCamera, TrackedTextFeature} from 'react-native-camera';
import {Appbar, Button, Title as NativeTitle} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

const allMenuItemNames = allMenuItems.map(({name}) => name);

const Component = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onManuallySelect = () => {
    navigation.navigate('MenuAddScreen');
  };

  const onTextRecognized = async ({
    textBlocks,
  }: {
    textBlocks: TrackedTextFeature[];
  }) => {
    const texts = getTexts(textBlocks);
    const isValid = getIsTextsValid(texts);

    if (isValid) {
      const menuItems = allMenuItems.filter(({name}) => texts.includes(name));
      const menuItemIds = R.pluck('id', menuItems);
      Vibration.vibrate(1000);
      dispatch(gameSlice.actions.startGame(menuItemIds));
      await analytics().logEvent('started_scanned');
      navigation.navigate('GameScreen');
    }
  };

  return (
    <Screen>
      <Camera onTextRecognized={onTextRecognized} captureAudio={false}>
        <MaskedHeader>
          <AppBarHeader>
            <BackButton color="white" icon="close" />
          </AppBarHeader>
        </MaskedHeader>
        <Body>
          <MaskedSide />
          <Scanner />
          <MaskedSide />
        </Body>
        <MaskedFooter>
          <TitleContainer>
            <Title>Scan your game board or{'\n'}manually select to start</Title>
            <ManuallySelectButton
              icon="selection"
              color="white"
              uppercase={false}
              onPress={onManuallySelect}>
              Select your menu
            </ManuallySelectButton>
          </TitleContainer>
        </MaskedFooter>
      </Camera>
    </Screen>
  );
};

const options = {
  headerShown: false,
};

export default class StartScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  background-color: ${colors.background};
  flex: 1;
`;

const Camera = styled(RNCamera)`
  flex: 1;
`;

const MaskedHeader = styled.View`
  background-color: ${colors.masked};
  width: 100%;
  min-height: 160px;
`;

const Body = styled.View`
  flex: 1;
  flex-direction: row;
`;

const MaskedFooter = styled.View`
  background-color: ${colors.masked};
  width: 100%;
  min-height: 200px;
`;

const AppBarHeader = styled(Appbar.Header)`
  background-color: transparent;
`;

const Title = styled(NativeTitle)`
  color: white;
  text-align: center;
`;

const TitleContainer = styled.View`
  flex: 1;
  margin: 24px 24px 24px 24px;
  align-items: center;
  justify-content: flex-end;
`;

const ManuallySelectButton = styled(Button)`
  background-color: black;
  margin-top: 16px;
`;

const MaskedSide = styled.View`
  height: 100%;
  width: 24px;
  background-color: ${colors.masked};
`;

const Scanner = styled.View`
  flex: 1;
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

const getTexts = (textBlocks: TrackedTextFeature[]) => {
  const validTextBlocks = textBlocks.filter((textBlock) => {
    const validItems = textBlock.components.filter(
      (textLine) =>
        textLine.type === 'line' && allMenuItemNames.includes(textLine.value),
    );
    return validItems.length > 0;
  });

  return validTextBlocks.map((textBlock) => {
    const isMaki = textBlock.value.startsWith('MAKI');
    if (isMaki) {
      return 'MAKI';
    }

    return textBlock.value;
  });
};

const getIsTextsValid = (texts: string[]) => {
  if (texts.length === 7) {
    const menuItems = allMenuItems.filter(({name}) => texts.includes(name));
    return getIsValid(menuItems);
  }
  return false;
};
