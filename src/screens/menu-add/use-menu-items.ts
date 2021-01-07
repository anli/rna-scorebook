import R from 'ramda';
import {useState} from 'react';

type Group = {
  name: string;
  maxCount: number;
  items: [string, string][];
};
const useMenuItems = () => {
  const [pickedMap, setPickedMap] = useState<{
    [key: string]: boolean;
  }>({});

  const rolls = Object.entries(rollsMap);
  const specials = Object.entries(specialsMap);
  const appetizers = Object.entries(appetizersMap);
  const desserts = Object.entries(dessertsMap);

  const groups: Group[] = [
    {
      name: 'rolls',
      maxCount: 1,
      items: rolls,
    },
    {
      name: 'specials',
      maxCount: 2,
      items: specials,
    },
    {
      name: 'appetizers',
      maxCount: 3,
      items: appetizers,
    },
    {
      name: 'desserts',
      maxCount: 1,
      items: desserts,
    },
  ];

  const groupCountMap = getGroupCountMap(pickedMap);
  const groupIsValidMap = getGroupIsValidMap(groups, groupCountMap);
  const isValid = Object.values(groupIsValidMap).every(Boolean);

  const getIsPicked = (itemId: string) => {
    return pickedMap[itemId];
  };

  const toggle = (itemId: string) => {
    const newPickedState = !(pickedMap[itemId] || false);
    setPickedMap({...pickedMap, [itemId]: newPickedState});
  };

  const getGroupIsPickedCount = (group: string) => {
    return groupCountMap[group] || 0;
  };

  return {
    rolls,
    specials,
    appetizers,
    desserts,
    toggle,
    pickedMap,
    getIsPicked,
    groups,
    getGroupIsPickedCount,
    isValid,
  };
};

export default useMenuItems;

const itemGroupMap: {[key: string]: string} = {
  temaki: 'rolls',
  uramaki: 'rolls',
  maki: 'rolls',
  soySauce: 'specials',
  wasabi: 'specials',
  spoon: 'specials',
  chopsticks: 'specials',
  takeoutBox: 'specials',
  tea: 'specials',
  specialOrder: 'specials',
  menu: 'specials',
  onigiri: 'appetizers',
  edamame: 'appetizers',
  tempura: 'appetizers',
  misoSoup: 'appetizers',
  sashimi: 'appetizers',
  eel: 'appetizers',
  dumpling: 'appetizers',
  tofu: 'appetizers',
  pudding: 'desserts',
  fruit: 'desserts',
  greenTeaIceCream: 'desserts',
};

const rollsMap = {
  temaki: 'TEMAKI',
  uramaki: 'URAMAKI',
  maki: 'MAKI',
};

const specialsMap = {
  soySauce: 'SOY SAUCE',
  wasabi: 'WASABI',
  spoon: 'SPOON',
  chopsticks: 'CHOPSTICKS',
  takeoutBox: 'TAKEOUT BOX',
  tea: 'TEA',
  specialOrder: 'SPECIAL ORDER',
  menu: 'MENU',
};

const appetizersMap = {
  onigiri: 'ONIGIRI',
  edamame: 'EDAMAME',
  tempura: 'TEMPURA',
  misoSoup: 'MISO SOUP',
  sashimi: 'SASHIMI',
  eel: 'EEL',
  dumpling: 'DUMPLING',
  tofu: 'TOFU',
};

const dessertsMap = {
  pudding: 'PUDDING',
  fruit: 'FRUIT',
  greenTeaIceCream: 'GREEN TEA ICE CREAM',
};

const getGroupCountMap = (pickedMap: {[key: string]: boolean}) => {
  const pickedItemIds = Object.keys(pickedMap).filter(
    (x) => pickedMap[x] === true,
  );

  const groupNames = pickedItemIds.map((itemId) => itemGroupMap[itemId]);
  return groupNames.reduce(
    (acc: {[key: string]: number}, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {},
  );
};

const getGroupIsValidMap = (
  groups: Group[],
  groupCountMap: {[key: string]: number},
) => {
  const groupMaxCountMap = groups.reduce((acc, group) => {
    return {...acc, [group.name]: group.maxCount};
  }, {});
  return R.mapObjIndexed<any, any>((value, key) => {
    return !R.isNil(groupCountMap[key]) && value === groupCountMap[key];
  }, groupMaxCountMap);
};
