import React from 'react';
import {View} from 'react-native';
import {Card, Checkbox, Paragraph} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  id: string;
  name: string;
  onPress: (key: string) => any;
  selected: boolean;
}

const MenuItem = ({id, name, onPress, selected}: Props) => {
  return (
    <Container onPress={() => onPress(id)}>
      <Content>
        <View>
          <Title numberOfLines={1}>{name}</Title>
        </View>
        <Checkbox
          testID={`${name}.${selected ? 'Selected' : 'Unselected'}`}
          status={selected ? 'checked' : 'unchecked'}
        />
      </Content>
    </Container>
  );
};

export default MenuItem;

const Container = styled(Card)`
  width: 160px;
  margin: 8px 0px 8px 0px;
`;

const Content = styled(Card.Content)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Paragraph)`
  width: 100px;
`;
