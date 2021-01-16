import React from 'react';
import {Headline} from 'react-native-paper';
import styled from 'styled-components/native';

const EmptyState = () => {
  return (
    <Screen>
      <Container>
        <Headline>You have not started any game yet.</Headline>
      </Container>
    </Screen>
  );
};

export default EmptyState;

const Screen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

const Container = styled.View`
  margin-left: 48px
  margin-right: 48px
`;
