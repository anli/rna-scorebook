import {colors} from '@theme';
import React from 'react';
import {Badge, Card, Paragraph} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  name: string;
  score: string;
}
const MenuItem = ({name, score}: Props) => {
  return (
    <MenuItemWrapper width={104}>
      <MenuItemWrapperContent>
        <Name numberOfLines={2}>{name}</Name>
      </MenuItemWrapperContent>
      <Score visible={Number(score) > 0} size={32}>
        {score}
      </Score>
    </MenuItemWrapper>
  );
};

export default MenuItem;

const MenuItemWrapper = styled(Card)<{width: number}>`
  height: 80px;
  width: ${(props) => props.width}px;
  margin: 8px 8px 8px 8px;
`;

const MenuItemWrapperContent = styled(Card.Content)``;

const Name = styled(Paragraph)``;

const Score = styled(Badge)`
  position: absolute;
  background-color: ${colors.primary};
  top: -8px;
  right: -8px;
`;
