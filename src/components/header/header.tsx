import React from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import styled from 'styled-components';

interface Props {
  onBack: () => void;
  title: string;
}
const Header = ({onBack, title}: Props) => {
  return (
    <AppBarHeader>
      <BackButton testID="BackButton" icon="arrow-left" onPress={onBack} />
      <Appbar.Content title={title} />
    </AppBarHeader>
  );
};

export default Header;

const AppBarHeader = styled(Appbar.Header)`
  background-color: transparent;
`;

const BackButton = styled(IconButton)`
  margin-left: 10px;
`;
