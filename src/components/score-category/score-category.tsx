import {colors} from '@theme';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Badge, Card, Paragraph} from 'react-native-paper';
import styled from 'styled-components/native';

const disabledOpacity = 0.4;

interface Props {
  name: string;
  value: string;
  disabled: boolean;
  numberOfColumns: number;
}

const ScoreCategory = ({name, value, disabled, numberOfColumns}: Props) => {
  const {width: windowWidth} = useWindowDimensions();
  const width = (windowWidth - 32 - numberOfColumns * 16) / numberOfColumns;

  return (
    <ScoreCategoryWrapper width={width} disabled={disabled}>
      <ScoreCategoryWrapperContent>
        <Name numberOfLines={2}>{name}</Name>
      </ScoreCategoryWrapperContent>
      <Score visible={canShowScore(value)} size={32}>
        {value}
      </Score>
    </ScoreCategoryWrapper>
  );
};

export default ScoreCategory;

const ScoreCategoryWrapper = styled(Card)<{width: number; disabled: boolean}>`
  height: 80px;
  width: ${(props) => props.width}px;
  margin: 8px 8px 8px 8px;
  opacity: ${({disabled}) => (disabled ? disabledOpacity : 1)};
`;

const ScoreCategoryWrapperContent = styled(Card.Content)``;

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
