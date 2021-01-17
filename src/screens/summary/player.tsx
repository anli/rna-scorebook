import {colors} from '@theme';
import React from 'react';
import {Caption, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Player = ({
  name,
  score,
  testID,
  rank,
}: {
  name: string;
  score?: string | number;
  testID?: string;
  rank: number;
}) => {
  return (
    <Container testID={testID}>
      <AvatarPlayer
        testID={`${testID}.Avatar`}
        size={getSize(rank)}
        // label={String(score)}
        // backgroundColor={color}
        // color="black"
      >
        <ScoreWrapper>
          <Score size={getSize(rank)}>{score}</Score>
        </ScoreWrapper>
      </AvatarPlayer>
      {rank === 1 && (
        <Border>
          <Crown name="crown" color={colors.crown} size={32} />
        </Border>
      )}

      <Name numberOfLines={1}>{name}</Name>
    </Container>
  );
};

export default Player;

const Container = styled.View`
  padding: 8px 8px 8px 8px;
`;

const AvatarPlayer = styled.View<{
  size: number;
}>`
  border-width: 4px;
  border-color: ${colors.primary};
  border-radius: ${(props) => props.size / 2}px;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

const Name = styled(Caption)`
  text-align: center;
`;

const Crown = styled(MaterialCommunityIcons)``;

const Border = styled.View`
  background-color: ${colors.primary};
  border-radius: 18px;
  position: absolute;
  border-width: 2px;
  border-color: white;
  right: 0px;
  top: 8px;
  transform: rotateZ(35deg);
`;

const getSize = (rank: number) => {
  switch (rank) {
    case 1:
      return 96;
    case 2:
      return 72;
    default:
      return 64;
  }
};

const Score = styled(Text)<{size: number}>`
  font-size: ${(props) => props.size / 2}px;
`;

const ScoreWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
