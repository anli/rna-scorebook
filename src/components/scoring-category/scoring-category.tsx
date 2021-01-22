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
  numberOfColumns?: number;
}

const ScoringCategory = ({
  name,
  value,
  disabled = false,
  numberOfColumns = 2,
}: Props) => {
  const {width: windowWidth} = useWindowDimensions();
  const width = (windowWidth - 48 - numberOfColumns * 16) / numberOfColumns;

  return (
    <ScoringCategoryWrapper width={width} disabled={disabled}>
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

const ScoringCategoryWrapper = styled(Card)<{width: number; disabled: boolean}>`
  height: 80px;
  width: ${(props) => props.width}px;
  margin: 8px 8px 8px 8px;
  opacity: ${({disabled}) => (disabled ? disabledOpacity : 1)};
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
