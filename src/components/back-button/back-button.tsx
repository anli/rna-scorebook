import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  color?: string;
  icon: string;
}

const BackButton = ({color, icon}: Props) => {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <Button color={color} testID="BackButton" icon={icon} onPress={onBack} />
  );
};

export default BackButton;

const Button = styled(IconButton)`
  margin-left: 0px;
`;
