import React from 'react';
import {useDarkMode} from 'react-native-dynamic';
import {Appbar, IconButton} from 'react-native-paper';
import styled from 'styled-components';

interface Props {
  onBack: () => void;
  title: string;
  children?: any;
}
const Header = ({onBack, title, children}: Props) => {
  const isDarkMode = useDarkMode();

  return (
    <AppBarHeader isDarkMode={isDarkMode}>
      <BackButton testID="BackButton" icon="arrow-left" onPress={onBack} />
      <Appbar.Content title={title} />
      {children}
    </AppBarHeader>
  );
};

export default Header;

const AppBarHeader = styled(Appbar.Header)<{isDarkMode: boolean}>`
  background-color: ${(props) => (props.isDarkMode ? 'black' : 'white')};
`;

const BackButton = styled(IconButton)`
  margin-left: 10px;
`;
