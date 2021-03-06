export const allMenuItems = [
  {
    id: 'eggNigiri',
    name: 'EGG NIGIRI',
    typeId: 'nigiri',
    scoreConfigMap: {
      question: 'Count how many egg nigiri cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '5', value: 5},
        {name: '6', value: 6},
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: '11', value: 11},
        {name: '12', value: 12},
      ],
    },
  },
  {
    id: 'salmonNigiri',
    name: 'SALMON NIGIRI',
    typeId: 'nigiri',
    scoreConfigMap: {
      question: 'Count how many salmon nigiri cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 2},
        {name: '2', value: 4},
        {name: '3', value: 6},
        {name: '4', value: 8},
        {name: '5', value: 10},
        {name: '6', value: 12},
        {name: '7', value: 14},
        {name: '8', value: 16},
        {name: '9', value: 18},
        {name: '10', value: 20},
        {name: '11', value: 22},
        {name: '12', value: 24},
      ],
    },
  },
  {
    id: 'squidNigiri',
    name: 'SQUID NIGIRI',
    typeId: 'nigiri',
    scoreConfigMap: {
      question: 'Count how many squid nigiri cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 3},
        {name: '2', value: 6},
        {name: '3', value: 9},
        {name: '4', value: 12},
        {name: '5', value: 15},
        {name: '6', value: 18},
        {name: '7', value: 21},
        {name: '8', value: 24},
        {name: '9', value: 27},
        {name: '10', value: 30},
        {name: '11', value: 33},
        {name: '12', value: 36},
      ],
    },
  },
  {
    id: 'temaki',
    name: 'TEMAKI',
    typeId: 'rolls',
    scoreConfigMap: {
      question: 'Compare how many temaki roll cards you have',
      options: [
        {name: 'Fewest', value: -4},
        {name: 'N/A', value: 0},
        {name: 'Most', value: 4},
      ],
    },
  },
  {
    id: 'uramaki',
    name: 'URAMAKI',
    typeId: 'rolls',
    scoreConfigMap: {
      question: 'Compare how fast you collect 10 uramaki icons',
      options: [
        {name: 'N/A', value: 0},
        {name: '3rd', value: 2},
        {name: '2nd', value: 5},
        {name: '1st', value: 8},
      ],
    },
  },
  {
    id: 'maki',
    name: 'MAKI',
    typeId: 'rolls',
    scoreConfigMap: {
      question: 'Compare how many maki roll icons you have',
      options: [
        {name: 'For 2 - 5 players'},
        {name: 'N/A', value: 0},
        {name: '2nd', value: 3},
        {name: '1st', value: 6},
        {name: 'For 6 - 8 players'},
        {name: 'N/A', value: 0},
        {name: '3rd', value: 2},
        {name: '2rd', value: 2},
        {name: '1st', value: 2},
      ],
    },
  },
  {
    id: 'soySauce',
    name: 'SOY SAUCE',
    typeId: 'specials',
    scoreConfigMap: {
      question:
        'If you have the most different colored backgrounds, count how many soy sauce cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 4},
        {name: '2', value: 8},
        {name: '3', value: 12},
        {name: '4', value: 16},
      ],
    },
  },
  {
    id: 'wasabi',
    name: 'WASABI',
    typeId: 'specials',
    scoreConfigMap: {
      question: 'Calculate how many points you get from wasabi',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '5', value: 5},
        {name: '6', value: 6},
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: '11', value: 11},
        {name: '12', value: 12},
      ],
    },
  },
  {
    id: 'spoon',
    name: 'SPOON',
    typeId: 'specials',
  },
  {
    id: 'chopsticks',
    name: 'CHOPSTICKS',
    typeId: 'specials',
  },
  {
    id: 'takeoutBox',
    name: 'TAKEOUT BOX',
    typeId: 'specials',
    scoreConfigMap: {
      question: 'Count how many flipped face-down cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 2},
        {name: '2', value: 4},
        {name: '3', value: 6},
        {name: '4', value: 8},
        {name: '5', value: 10},
        {name: '6', value: 12},
        {name: '7', value: 14},
        {name: '8', value: 16},
        {name: '9', value: 18},
        {name: '10', value: 20},
      ],
    },
  },
  {
    id: 'tea',
    name: 'TEA',
    typeId: 'specials',
    scoreConfigMap: {
      question: 'Calculate how many points you get from tea',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '5', value: 5},
        {name: '6', value: 6},
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: '11', value: 11},
        {name: '12', value: 12},
      ],
    },
  },
  {
    id: 'specialOrder',
    name: 'SPECIAL ORDER',
    typeId: 'specials',
  },
  {
    id: 'menu',
    name: 'MENU',
    typeId: 'specials',
  },
  {
    id: 'onigiri',
    name: 'ONIGIRI',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Calculate how many points you get from onigiri',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '5', value: 5},
        {name: '6', value: 6},
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: '11', value: 11},
        {name: '12', value: 12},
        {name: '13', value: 13},
        {name: '14', value: 14},
        {name: '15', value: 15},
        {name: '16', value: 16},
        {name: '17', value: 17},
        {name: '18', value: 18},
      ],
    },
  },
  {
    id: 'edamame',
    name: 'EDAMAME',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Calculate how many points you get from edamame',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '5', value: 5},
        {name: '6', value: 6},
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: '11', value: 11},
        {name: '12', value: 12},
        {name: '13', value: 13},
        {name: '14', value: 14},
        {name: '15', value: 15},
        {name: '16', value: 16},
        {name: '17', value: 17},
        {name: '18', value: 18},
      ],
    },
  },
  {
    id: 'tempura',
    name: 'TEMPURA',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Count how many tempura cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 0},
        {name: '2', value: 5},
        {name: '3', value: 5},
        {name: '4', value: 10},
        {name: '5', value: 10},
        {name: '6', value: 15},
        {name: '7', value: 15},
        {name: '8', value: 20},
        {name: '9', value: 20},
        {name: '10+', value: 25},
      ],
    },
  },
  {
    id: 'misoSoup',
    name: 'MISO SOUP',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Count how many miso soup cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 3},
        {name: '2', value: 6},
        {name: '3', value: 9},
        {name: '4', value: 12},
        {name: '5', value: 15},
        {name: '6', value: 18},
        {name: '7', value: 21},
        {name: '8', value: 24},
        {name: '9', value: 27},
        {name: '10', value: 30},
        {name: '11', value: 33},
      ],
    },
  },
  {
    id: 'sashimi',
    name: 'SASHIMI',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Count how many sashimi cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 0},
        {name: '2', value: 0},
        {name: '3', value: 10},
        {name: '4', value: 10},
        {name: '5', value: 10},
        {name: '6', value: 20},
        {name: '7', value: 20},
        {name: '8', value: 20},
        {name: '9+', value: 30},
      ],
    },
  },
  {
    id: 'eel',
    name: 'EEL',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Count how many eel cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: -3},
        {name: '2+', value: 7},
      ],
    },
  },
  {
    id: 'dumpling',
    name: 'DUMPLING',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Count how many dumpling cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 1},
        {name: '2', value: 3},
        {name: '3', value: 6},
        {name: '4', value: 10},
        {name: '5+', value: 15},
      ],
    },
  },
  {
    id: 'tofu',
    name: 'TOFU',
    typeId: 'appetizers',
    scoreConfigMap: {
      question: 'Count how many tofu cards you have',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 2},
        {name: '2', value: 6},
        {name: '3+', value: 0},
      ],
    },
  },
  {
    id: 'pudding',
    name: 'PUDDING',
    typeId: 'desserts',
    scoreConfigMap: {
      question: 'Compare how many pudding cards you have',
      options: [
        {name: 'For 2 players'},
        {name: 'Fewest', value: 0},
        {name: 'Most', value: 6},
        {name: 'For 3 - 8 players'},
        {name: 'Fewest', value: -6},
        {name: 'N/A', value: 0},
        {name: 'Most', value: 6},
      ],
    },
  },
  {
    id: 'fruit',
    name: 'FRUIT',
    typeId: 'desserts',
    scoreConfigMap: {
      question: 'Calculate how many points you get from fruit',
      options: [
        {name: '0', value: 0},
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '5', value: 5},
        {name: '6', value: 6},
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: '11', value: 11},
        {name: '12', value: 12},
        {name: '13', value: 13},
        {name: '14', value: 14},
        {name: '15', value: 15},
        {name: '16', value: 16},
        {name: '17', value: 17},
        {name: '18', value: 18},
        {name: '19', value: 19},
        {name: '20', value: 20},
        {name: '21', value: 21},
        {name: '22', value: 22},
        {name: '23', value: 23},
        {name: '24', value: 24},
        {name: '25', value: 25},
        {name: '26', value: 26},
        {name: '27', value: 27},
        {name: '28', value: 28},
        {name: '29', value: 29},
        {name: '30', value: 30},
      ],
    },
  },
  {
    id: 'greenTeaIceCream',
    name: 'GREEN TEA ICE CREAM',
    typeId: 'desserts',
    scoreConfigMap: {
      question: 'Count how many green tea ice cream cards you have',
      options: [
        {name: '0+', value: 0},
        {name: '4+', value: 12},
        {name: '8+', value: 24},
        {name: '12+', value: 36},
        {name: '16+', value: 48},
      ],
    },
  },
];
