import {useState} from 'react';

const useMenuItems = () => {
  const [pickedMap, setPickedMap] = useState<{
    [key: string]: boolean;
  }>({});

  const rolls = Object.entries(rollsMap);
  const specials = Object.entries(specialsMap);
  const appetizers = Object.entries(appetizersMap);
  const desserts = Object.entries(dessertsMap);

  const getIsPicked = (id: string) => {
    return pickedMap[id];
  };

  const toggle = (id: string) => {
    const newPickedState = !(pickedMap[id] || false);
    setPickedMap({...pickedMap, [id]: newPickedState});
  };
  return {
    rolls,
    specials,
    appetizers,
    desserts,
    toggle,
    pickedMap,
    getIsPicked,
  };
};

export default useMenuItems;

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
  specialOrder: 'SPECIAL ORDER',
  menu: 'MENU',
};

const appetizersMap = {
  onigiri: 'ONGIRI',
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
