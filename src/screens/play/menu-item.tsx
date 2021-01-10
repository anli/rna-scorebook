import React from 'react';
import {useWindowDimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import styled from 'styled-components/native';

const itemPerRow = 2;

interface Props {
  name: string;
  score: number;
  onPress: () => any;
}

const MenuItem = ({name, score, onPress}: Props) => {
  const {width: windowWidth} = useWindowDimensions();
  const width = Math.floor(windowWidth / itemPerRow - 48 + itemPerRow * 8);

  return (
    <MenuItemWrapper width={width}>
      <MenuItemWrapperContent>
        <TouchableOpacity onPress={onPress}>
          <Row>
            <Score color="black" size={48} label={String(score)} />
            <NameWrapper>
              <Name numberOfLines={2}>{name}</Name>
            </NameWrapper>
          </Row>
        </TouchableOpacity>
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

const Score = styled(Avatar.Text)`
  background-color: white;
`;

const NameWrapper = styled.View`
  flex: 1;
  margin-left: 8px;
`;

const Name = styled(Paragraph)``;

const MenuItemWrapper = styled(Card)<{width: number}>`
  width: ${(props) => props.width}px;
  margin: 8px 0px 8px 0px;
`;

const MenuItemWrapperContent = styled(Card.Content)``;
