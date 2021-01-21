import {colors} from '@theme';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Badge, Card, Paragraph} from 'react-native-paper';
import styled from 'styled-components/native';

const numberOfColumns = 2;

interface Props {
  name: string;
  value: string;
}

const ScoringCategory = ({name, value}: Props) => {
  const {width: windowWidth} = useWindowDimensions();
  const width = (windowWidth - 48 - numberOfColumns * 16) / numberOfColumns;

  return (
    <ScoringCategoryWrapper width={width}>
      <ScoringCategoryWrapperContent>
        <Name numberOfLines={2}>{name}</Name>
      </ScoringCategoryWrapperContent>
      <Score visible={canShowScore(value)} size={32}>
        {value}
      </Score>
    </ScoringCategoryWrapper>
  );
};

export default ScoringCategory;

const ScoringCategoryWrapper = styled(Card)<{width: number}>`
  height: 80px;
  width: ${(props) => props.width}px;
  margin: 8px 8px 8px 8px;
`;

const ScoringCategoryWrapperContent = styled(Card.Content)``;

const Name = styled(Paragraph)``;

const Score = styled(Badge)`
  position: absolute;
  background-color: ${colors.primary};
  top: -8px;
  right: -8px;
`;

const canShowScore = (value: string) => {
  return Number(value) !== 0;
};
