import {colors} from '@theme';
import R from 'ramda';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  question?: string;
  options?: {name: string; value?: number}[];
  onPress: (value: number) => any;
  testID: string;
}

const MenuItemOptions = ({question, options, onPress, testID}: Props) => {
  return (
    <Card>
      <Card.Content>
        <Question>{question}</Question>
        <Options>
          {options &&
            options.map(({name, value}, index) => {
              if (!R.isNil(value)) {
                return (
                  <TouchableOpacity
                    testID={`${testID}.${name}`}
                    key={index}
                    onPress={() => onPress(value)}>
                    <Option uppercase={false}>
                      <OptionName>{name}</OptionName>
                    </Option>
                  </TouchableOpacity>
                );
              }
              return <Subheading key={index}>{name}</Subheading>;
            })}
        </Options>
      </Card.Content>
    </Card>
  );
};

export default MenuItemOptions;

const Question = styled(Title)`
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
`;

const Options = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Option = styled(Button)``;

const OptionName = styled(Title)`
  color: ${colors.primary};
`;

const Subheading = styled(Paragraph)`
  width: 100%;
  margin-left: 16px;
  margin-right: 16px;
`;
