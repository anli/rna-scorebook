import {colors} from '@theme';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';

interface Props {
  data: any[];
  render: (routeData: any[], index: number) => JSX.Element;
}

const Rounds = ({data, render}: Props) => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '1'},
    {key: 'second', title: '2'},
    {key: 'third', title: '3'},
  ]);

  const initialLayout = {width};

  const renderScene = () => render(data[index], index);

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
