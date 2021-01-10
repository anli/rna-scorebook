import React from 'react';
import {Card, IconButton, Paragraph, Title} from 'react-native-paper';
import styled from 'styled-components/native';

const itemPerRow = 3;

const MenuItem = ({
  windowWidth,
  name,
  score,
  onReducePress,
  onAddPress,
  menuItemId,
}: any) => {
  const width = Math.floor(windowWidth / itemPerRow - 48 + itemPerRow * 8);

  return (
    <MenuItemWrapper width={width}>
      <MenuItemWrapperContent>
        <Row>
          <IconButton
            testID={`${menuItemId}.MinusButton`}
            icon="minus"
            onPress={onReducePress}
          />
          <Score>{score}</Score>
          <IconButton
            testID={`${menuItemId}.AddButton`}
            icon="plus"
            onPress={onAddPress}
          />
        </Row>
        <Name numberOfLines={1}>{name}</Name>
      </MenuItemWrapperContent>
    </MenuItemWrapper>
  );
};

export default MenuItem;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Score = styled(Title)``;

const Name = styled(Paragraph)`
  align-self: center;
`;

const MenuItemWrapper = styled(Card)<{width: number}>`
  width: ${(props) => props.width}px;
  margin: 8px 0px 8px 0px;
`;

const MenuItemWrapperContent = styled(Card.Content)`
  padding-top: 4px;
  padding-bottom: 8px;
`;
