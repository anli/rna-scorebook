import {colors} from '@theme';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';

type RoundId = 'round1' | 'round2' | 'round3';
interface Props {
  data: any[];
  render: (routeData: any[], roundId: RoundId) => JSX.Element;
}

const rounds: {key: RoundId; title: string; testID: string}[] = [
  {key: 'round1', title: '1', testID: 'Round1Button'},
  {key: 'round2', title: '2', testID: 'Round2Button'},
  {key: 'round3', title: '3', testID: 'Round3Button'},
];

const Rounds = ({data, render}: Props) => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState(rounds);

  const initialLayout = {width};

  const renderScene = () => render(data[index], rounds[index].key);

  const Tabs = (props: any) => (
    <TabBar
      getLabelText={({route}) => route.title}
      {...props}
      activeColor={colors.primary}
      inactiveColor="black"
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: colors.background}}
    />
  );

  return (
    <TabView
      renderTabBar={Tabs}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default Rounds;
