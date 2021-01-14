import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from '@theme';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import {
  Appbar,
  Button,
  IconButton,
  Title as NativeTitle,
} from 'react-native-paper';
import styled from 'styled-components/native';

const Component = () => {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <Screen>
      <Camera onTextRecognized={undefined} captureAudio={false}>
        <MaskedHeader>
          <AppBarHeader>
            <BackButton
              color="white"
              testID="BackButton"
              icon="close"
              onPress={onBack}
            />
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
              uppercase={false}>
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

const BackButton = styled(IconButton)`
  margin-left: 10px;
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
