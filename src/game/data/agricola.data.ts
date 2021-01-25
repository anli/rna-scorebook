import {Game, ScoreCategory} from '../types';

const game: Game = {
  id: 'agricola',
  name: 'Agricola',
};

const scoreCategories: ScoreCategory[] = [
  {
    id: 'fields',
    name: 'Fields',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Fields you have',
        options: [
          {name: '0 - 1', value: '-1'},
          {name: '2', value: '1'},
          {name: '3', value: '2'},
          {name: '4', value: '3'},
          {name: '5+', value: '4'},
        ],
      },
    ],
    abbreviation: '🟫',
    isNumeric: true,
  },
  {
    id: 'pastures',
    name: 'pastures',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Pastures you have',
        options: [
          {name: '0', value: '-1'},
          {name: '1', value: '1'},
          {name: '2', value: '2'},
          {name: '3', value: '3'},
          {name: '4+', value: '4'},
        ],
      },
    ],
    abbreviation: '🟩',
    isNumeric: true,
  },
  {
    id: 'grains',
    name: 'Grains',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Grains you have',
        options: [
          {name: '0', value: '-1'},
          {name: '1', value: '1'},
          {name: '4', value: '2'},
          {name: '6', value: '3'},
          {name: '8+', value: '4'},
        ],
      },
    ],
    abbreviation: '🌾',
    isNumeric: true,
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Vegetables you have',
        options: [
          {name: '0', value: '-1'},
          {name: '1', value: '1'},
          {name: '2', value: '2'},
          {name: '3', value: '3'},
          {name: '4+', value: '4'},
        ],
      },
    ],
    abbreviation: '🥕',
    isNumeric: true,
  },
  {
    id: 'sheep',
    name: 'Sheep',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Sheep you have',
        options: [
          {name: '0', value: '-1'},
          {name: '1', value: '1'},
          {name: '4', value: '2'},
          {name: '6', value: '3'},
          {name: '8+', value: '4'},
        ],
      },
    ],
    abbreviation: '🐑',
    isNumeric: true,
  },
  {
    id: 'boar',
    name: 'Boar',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Boar you have',
        options: [
          {name: '0', value: '-1'},
          {name: '1', value: '1'},
          {name: '3', value: '2'},
          {name: '5', value: '3'},
          {name: '7+', value: '4'},
        ],
      },
    ],
    abbreviation: '🐗',
    isNumeric: true,
  },
  {
    id: 'cattle',
    name: 'Cattle',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Cattle you have',
        options: [
          {name: '0', value: '-1'},
          {name: '1', value: '1'},
          {name: '2', value: '2'},
          {name: '4', value: '3'},
          {name: '6+', value: '4'},
        ],
      },
    ],
    abbreviation: '🐮',
    isNumeric: true,
  },
  {
    id: 'unusedFarmyardSpaces',
    name: 'Unused Farmyard',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Unused Farmyard Spaces you have',
        options: [
          {name: '0', value: '0'},
          {name: '1', value: '-1'},
          {name: '2', value: '-2'},
          {name: '3', value: '-3'},
          {name: '4', value: '-4'},
          {name: '5', value: '-5'},
          {name: '6', value: '-6'},
          {name: '7', value: '-7'},
          {name: '8', value: '-8'},
          {name: '9', value: '-9'},
          {name: '10', value: '-10'},
          {name: '11', value: '-11'},
          {name: '12', value: '-12'},
          {name: '13', value: '-13'},
        ],
      },
    ],
    abbreviation: '❎',
    isNumeric: true,
  },
  {
    id: 'fencedStables',
    name: 'Fenced Stables',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Fenced Stables you have',
        options: [
          {name: '0', value: '0'},
          {name: '1', value: '1'},
          {name: '2', value: '2'},
          {name: '3', value: '3'},
          {name: '4', value: '4'},
        ],
      },
    ],
    abbreviation: '🚧',
    isNumeric: true,
  },
  {
    id: 'hut',
    name: 'Hut',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Hut you have',
        options: [
          {name: '0', value: '0'},
          {name: 'Clay'},
          {name: '2', value: '2'},
          {name: '3', value: '3'},
          {name: '4', value: '4'},
          {name: '5', value: '5'},
          {name: '6', value: '6'},
          {name: '7', value: '7'},
          {name: '8', value: '8'},
          {name: '9', value: '9'},
          {name: 'Stone'},
          {name: '2', value: '4'},
          {name: '3', value: '6'},
          {name: '4', value: '8'},
          {name: '5', value: '10'},
          {name: '6', value: '12'},
          {name: '7', value: '14'},
          {name: '8', value: '16'},
          {name: '9', value: '18'},
        ],
      },
    ],
    abbreviation: '🏠',
    isNumeric: true,
  },
  {
    id: 'familyMembers',
    name: 'Family',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Family Members you have',
        options: [
          {name: '2', value: '6'},
          {name: '3', value: '9'},
          {name: '4', value: '12'},
          {name: '5', value: '15'},
        ],
      },
    ],
    abbreviation: '👪',
    isNumeric: true,
  },
  {
    id: 'cardPoints',
    name: 'Cards',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many points from cards you have',
        options: [
          {name: '0', value: '0'},
          {name: '1', value: '1'},
          {name: '2', value: '2'},
          {name: '3', value: '3'},
          {name: '4', value: '4'},
          {name: '5', value: '5'},
          {name: '6', value: '6'},
          {name: '7', value: '7'},
          {name: '8', value: '8'},
          {name: '9', value: '9'},
          {name: '10', value: '10'},
          {name: '11', value: '11'},
          {name: '12', value: '12'},
          {name: '13', value: '13'},
          {name: '14', value: '14'},
          {name: '15', value: '15'},
          {name: '16', value: '16'},
          {name: '17', value: '17'},
          {name: '18', value: '18'},
          {name: '19', value: '19'},
          {name: '20', value: '20'},
        ],
      },
    ],
    abbreviation: '🃏',
    isNumeric: true,
  },
  {
    id: 'bonusPoints',
    name: 'Bonus',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many Bonus Points you have',
        options: [
          {name: '0', value: '0'},
          {name: '1', value: '1'},
          {name: '2', value: '2'},
          {name: '3', value: '3'},
          {name: '4', value: '4'},
          {name: '5', value: '5'},
          {name: '6', value: '6'},
          {name: '7', value: '7'},
          {name: '8', value: '8'},
          {name: '9', value: '9'},
          {name: '10', value: '10'},
          {name: '11', value: '11'},
          {name: '12', value: '12'},
          {name: '13', value: '13'},
          {name: '14', value: '14'},
          {name: '15', value: '15'},
          {name: '16', value: '16'},
          {name: '17', value: '17'},
          {name: '18', value: '18'},
          {name: '19', value: '19'},
          {name: '20', value: '20'},
        ],
      },
    ],
    abbreviation: '❓',
    isNumeric: true,
  },
];

const summaryConfig = {
  isInverted: true,
};

export default class AgricolaData {
  static game = game;
  static scoreCategories = scoreCategories;
  static summaryConfig = summaryConfig;
}
