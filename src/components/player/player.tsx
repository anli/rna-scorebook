import {colors} from '@theme';
import React from 'react';
import AnimateNumber from 'react-native-animate-number';
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
  score?: string | number;
  color: string;
  selected: boolean;
  onPress?: () => any;
  testID?: string;
}) => {
  const showAnimatedScore = score !== '+';
  const label = showAnimatedScore ? '' : String(score);

  return (
    <Container testID={testID} onPress={onPress}>
      <AvatarPlayer
        testID={`${testID}.Avatar`}
        size={64}
        label={label}
        backgroundColor={color}
        selected={selected}
      />
      {showAnimatedScore && (
        <Score value={score} formatter={(val: number) => Math.floor(val)} />
      )}
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

const Score = styled(AnimateNumber)`
  font-size: 32px;
  color: grey;
  position: absolute;
  flex: 1;
  align-self: center;
  margin-top: 24px;
`;
