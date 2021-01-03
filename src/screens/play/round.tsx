import React, {useState} from 'react';
import {Headline, IconButton} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  data: string[];
  testID: string;
}

const Round = ({data, testID}: Props) => {
  const [index, setIndex] = useState<number>(0);

  const showBack = index !== 0;
  const showNext = index !== data.length - 1;

  const changeIndex = (newIndex: number) => {
    setIndex(newIndex);
  };

  const onBack = () => {
    showBack && changeIndex(index - 1);
  };

  const onNext = () => {
    showNext && changeIndex(index + 1);
  };

  return (
    <Container>
      <Headline>{data[index]}</Headline>
      <Buttons>
        {showBack && (
          <IconButton
            icon="arrow-left"
            onPress={onBack}
            testID={`${testID}.PreviousButton`}
          />
        )}
        {showNext && (
          <IconButton
            icon="arrow-right"
            onPress={onNext}
            testID={`${testID}.NextButton`}
          />
        )}
      </Buttons>
    </Container>
  );
};

export default Round;

const Container = styled.View`
  padding: 0px 24px 0px 24px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Buttons = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
