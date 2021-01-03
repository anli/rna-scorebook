import React, {useState} from 'react';
import {Headline, IconButton} from 'react-native-paper';
import styled from 'styled-components/native';

type Item = {id: string; name: string; score: number};
interface Props {
  data: Item[];
  testID: string;
  onChange: (item: Item) => any;
}

const Rounds = ({data, testID, onChange}: Props) => {
  const [index, setIndex] = useState<number>(0);

  const showBack = index !== 0;
  const showNext = index !== data.length - 1;

  const changeIndex = (newIndex: number) => {
    setIndex(newIndex);
    onChange(data[newIndex]);
  };

  const onBack = () => {
    showBack && changeIndex(index - 1);
  };

  const onNext = () => {
    showNext && changeIndex(index + 1);
  };

  return (
    <Container>
      <Headline>{`${data[index].name} (${data[index].score})`}</Headline>
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

export default Rounds;

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
