import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {RNCamera as NativeRNCamera} from 'react-native-camera';
import styled from 'styled-components/native';

const Component = () => {
  return (
    <>
      <Screen>
        <RNCamera
          // onTextRecognized={this.textRecognized}
          captureAudio={false}>
          {/* {this.state.ocrElements &&
            this.state.ocrElements.map((element) =>
              this.renderOcrElement(element),
            )} */}
        </RNCamera>
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
