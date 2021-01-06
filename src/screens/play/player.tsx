import {colors} from '@theme';
import React from 'react';
import {Avatar, Caption} from 'react-native-paper';
import styled from 'styled-components/native';

const Player = ({
  name,
  score,
  color,
  selected,
  onPress,
  testID,
}: {
  name: string;
  score: string | number;
  color: string;
  selected: boolean;
  onPress?: () => any;
  testID?: string;
}) => {
  return (
    <Container testID={testID} onPress={onPress}>
      <AvatarPlayer
        size={64}
        label={String(score)}
        backgroundColor={color}
        selected={selected}
      />
      <Name numberOfLines={1}>{name}</Name>
    </Container>
  );
};

export default Player;

const Container = styled.TouchableOpacity`
  padding: 12px 12px 12px 12px;
`;

const AvatarPlayer = styled(Avatar.Text)<{
  backgroundColor: string;
  selected: boolean;
}>`
  border-width: 4px;
  border-color: ${(props) =>
    props.selected ? colors.primary : props.backgroundColor};
  background-color: ${(props) => props.backgroundColor};
`;

const Name = styled(Caption)`
  text-align: center;
  width: 64px;
`;
