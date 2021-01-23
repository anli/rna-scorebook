type ScoreCategory = {
  id: ScoreCategoryId;
  name: string;
  blockById?: ScoreCategoryId;
  blockIds?: ScoreCategoryId[];
  configs: {
    question: string;
    options: {name: string; value: string; key: OptionKey}[];
    typeId: TypeId;
  }[];
  isNumeric?: boolean;
  abbreviation: string;
};

const game = {
  id: 'scythe',
  name: 'Scythe',
};

type TypeId = 'all' | 'T1' | 'T2' | 'T3';

type OptionKey = 'typeId' | 'score';

type ScoreCategoryId =
  | 'popularity'
  | 'coinsInHand'
  | 'everyStarPlaced'
  | 'everyTerritoryControlled'
  | 'everyTwoResource'
  | 'structureBonus';

const scoringCategories: ScoreCategory[] = [
  {
    id: 'popularity',
    name: 'POPULARITY',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many popularity you have',
        options: [
          {name: '0 - 6', key: 'typeId', value: 'T1'},
          {name: '7 - 12', key: 'typeId', value: 'T2'},
          {name: '13 - 18', key: 'typeId', value: 'T3'},
        ],
      },
    ],
    abbreviation: '🗳️',
    isNumeric: true,
  },
  {
    id: 'coinsInHand',
    name: 'COINS',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many coins in hand you have',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '1'},
          {name: '2', key: 'score', value: '2'},
          {name: '3', key: 'score', value: '3'},
          {name: '4', key: 'score', value: '4'},
          {name: '5', key: 'score', value: '5'},
          {name: '6', key: 'score', value: '6'},
          {name: '7', key: 'score', value: '7'},
          {name: '8', key: 'score', value: '8'},
          {name: '9', key: 'score', value: '9'},
          {name: '10', key: 'score', value: '10'},
          {name: '11', key: 'score', value: '11'},
          {name: '12', key: 'score', value: '12'},
          {name: '13', key: 'score', value: '13'},
          {name: '14', key: 'score', value: '14'},
          {name: '15', key: 'score', value: '15'},
          {name: '16', key: 'score', value: '16'},
          {name: '17', key: 'score', value: '17'},
          {name: '18', key: 'score', value: '18'},
          {name: '19', key: 'score', value: '19'},
          {name: '20', key: 'score', value: '20'},
          {name: '21', key: 'score', value: '21'},
          {name: '22', key: 'score', value: '22'},
          {name: '23', key: 'score', value: '23'},
          {name: '24', key: 'score', value: '24'},
          {name: '25', key: 'score', value: '25'},
          {name: '26', key: 'score', value: '26'},
          {name: '27', key: 'score', value: '27'},
          {name: '28', key: 'score', value: '28'},
          {name: '29', key: 'score', value: '29'},
          {name: '30', key: 'score', value: '30'},
          {name: '31', key: 'score', value: '31'},
          {name: '32', key: 'score', value: '32'},
          {name: '33', key: 'score', value: '33'},
          {name: '34', key: 'score', value: '34'},
          {name: '35', key: 'score', value: '35'},
          {name: '36', key: 'score', value: '36'},
          {name: '37', key: 'score', value: '37'},
          {name: '38', key: 'score', value: '38'},
          {name: '39', key: 'score', value: '39'},
          {name: '40', key: 'score', value: '40'},
          {name: '41', key: 'score', value: '41'},
          {name: '42', key: 'score', value: '42'},
          {name: '43', key: 'score', value: '43'},
          {name: '44', key: 'score', value: '44'},
          {name: '45', key: 'score', value: '45'},
          {name: '46', key: 'score', value: '46'},
          {name: '47', key: 'score', value: '47'},
          {name: '48', key: 'score', value: '48'},
          {name: '49', key: 'score', value: '49'},
          {name: '50', key: 'score', value: '50'},
        ],
      },
    ],
    isNumeric: true,
    abbreviation: '💰',
  },
  {
    id: 'everyStarPlaced',
    name: 'STARS',
    blockById: 'popularity',
    configs: [
      {
        typeId: 'T1',
        question: 'Count every stars you placed',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '3'},
          {name: '2', key: 'score', value: '6'},
          {name: '3', key: 'score', value: '9'},
          {name: '4', key: 'score', value: '12'},
          {name: '5', key: 'score', value: '15'},
          {name: '6', key: 'score', value: '18'},
        ],
      },
      {
        typeId: 'T2',
        question: 'Count every stars you placed',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '4'},
          {name: '2', key: 'score', value: '8'},
          {name: '3', key: 'score', value: '12'},
          {name: '4', key: 'score', value: '16'},
          {name: '5', key: 'score', value: '20'},
          {name: '6', key: 'score', value: '24'},
        ],
      },
      {
        typeId: 'T3',
        question: 'Count every stars you placed',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '5'},
          {name: '2', key: 'score', value: '10'},
          {name: '3', key: 'score', value: '15'},
          {name: '4', key: 'score', value: '20'},
          {name: '5', key: 'score', value: '25'},
          {name: '6', key: 'score', value: '30'},
        ],
      },
    ],
    isNumeric: true,
    abbreviation: '⭐',
  },
  {
    id: 'everyTerritoryControlled',
    name: 'TERRITORY',
    blockById: 'popularity',
    configs: [
      {
        typeId: 'T1',
        question: 'Count every territory you controlled',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '2'},
          {name: '2', key: 'score', value: '4'},
          {name: '3', key: 'score', value: '6'},
          {name: '4', key: 'score', value: '8'},
          {name: '5', key: 'score', value: '10'},
          {name: '6', key: 'score', value: '12'},
          {name: '7', key: 'score', value: '14'},
          {name: '8', key: 'score', value: '16'},
          {name: '9', key: 'score', value: '18'},
          {name: '10', key: 'score', value: '20'},
          {name: '11', key: 'score', value: '22'},
          {name: '12', key: 'score', value: '24'},
          {name: '13', key: 'score', value: '26'},
          {name: '14', key: 'score', value: '28'},
          {name: '15', key: 'score', value: '30'},
          {name: '16', key: 'score', value: '32'},
          {name: '17', key: 'score', value: '34'},
          {name: '18', key: 'score', value: '36'},
          {name: '19', key: 'score', value: '38'},
        ],
      },
      {
        typeId: 'T2',
        question: 'Count every territory you controlled',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '3'},
          {name: '2', key: 'score', value: '6'},
          {name: '3', key: 'score', value: '9'},
          {name: '4', key: 'score', value: '12'},
          {name: '5', key: 'score', value: '15'},
          {name: '6', key: 'score', value: '18'},
          {name: '7', key: 'score', value: '21'},
          {name: '8', key: 'score', value: '24'},
          {name: '9', key: 'score', value: '27'},
          {name: '10', key: 'score', value: '30'},
          {name: '11', key: 'score', value: '33'},
          {name: '12', key: 'score', value: '36'},
          {name: '13', key: 'score', value: '39'},
          {name: '14', key: 'score', value: '42'},
          {name: '15', key: 'score', value: '45'},
          {name: '16', key: 'score', value: '48'},
          {name: '17', key: 'score', value: '51'},
          {name: '18', key: 'score', value: '54'},
          {name: '19', key: 'score', value: '57'},
        ],
      },
      {
        typeId: 'T3',
        question: 'Count every territory you controlled',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '4'},
          {name: '2', key: 'score', value: '8'},
          {name: '3', key: 'score', value: '12'},
          {name: '4', key: 'score', value: '16'},
          {name: '5', key: 'score', value: '20'},
          {name: '6', key: 'score', value: '24'},
          {name: '7', key: 'score', value: '28'},
          {name: '8', key: 'score', value: '32'},
          {name: '9', key: 'score', value: '36'},
          {name: '10', key: 'score', value: '40'},
          {name: '11', key: 'score', value: '44'},
          {name: '12', key: 'score', value: '48'},
          {name: '13', key: 'score', value: '52'},
          {name: '14', key: 'score', value: '56'},
          {name: '15', key: 'score', value: '60'},
          {name: '16', key: 'score', value: '64'},
          {name: '17', key: 'score', value: '68'},
          {name: '18', key: 'score', value: '72'},
          {name: '19', key: 'score', value: '76'},
        ],
      },
    ],
    isNumeric: true,
    abbreviation: '🛑',
  },
  {
    id: 'everyTwoResource',
    name: 'RESOURCES',
    blockById: 'popularity',
    configs: [
      {
        typeId: 'T1',
        question: 'Count every 2 resource you controlled',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '1'},
          {name: '2', key: 'score', value: '2'},
          {name: '3', key: 'score', value: '3'},
          {name: '4', key: 'score', value: '4'},
          {name: '5', key: 'score', value: '5'},
          {name: '6', key: 'score', value: '6'},
          {name: '7', key: 'score', value: '7'},
          {name: '8', key: 'score', value: '8'},
          {name: '9', key: 'score', value: '9'},
          {name: '10', key: 'score', value: '10'},
          {name: '11', key: 'score', value: '11'},
          {name: '12', key: 'score', value: '12'},
          {name: '13', key: 'score', value: '13'},
          {name: '14', key: 'score', value: '14'},
          {name: '15', key: 'score', value: '15'},
          {name: '16', key: 'score', value: '16'},
          {name: '17', key: 'score', value: '17'},
          {name: '18', key: 'score', value: '18'},
          {name: '19', key: 'score', value: '19'},
          {name: '20', key: 'score', value: '20'},
        ],
      },
      {
        typeId: 'T2',
        question: 'Count every 2 resource you controlled',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '2'},
          {name: '2', key: 'score', value: '4'},
          {name: '3', key: 'score', value: '6'},
          {name: '4', key: 'score', value: '8'},
          {name: '5', key: 'score', value: '10'},
          {name: '6', key: 'score', value: '12'},
          {name: '7', key: 'score', value: '14'},
          {name: '8', key: 'score', value: '16'},
          {name: '9', key: 'score', value: '18'},
          {name: '10', key: 'score', value: '20'},
          {name: '11', key: 'score', value: '22'},
          {name: '12', key: 'score', value: '24'},
          {name: '13', key: 'score', value: '26'},
          {name: '14', key: 'score', value: '28'},
          {name: '15', key: 'score', value: '30'},
          {name: '16', key: 'score', value: '32'},
          {name: '17', key: 'score', value: '34'},
          {name: '18', key: 'score', value: '36'},
          {name: '19', key: 'score', value: '38'},
          {name: '20', key: 'score', value: '40'},
        ],
      },
      {
        typeId: 'T3',
        question: 'Count every 2 resource you controlled',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '3'},
          {name: '2', key: 'score', value: '6'},
          {name: '3', key: 'score', value: '9'},
          {name: '4', key: 'score', value: '12'},
          {name: '5', key: 'score', value: '15'},
          {name: '6', key: 'score', value: '18'},
          {name: '7', key: 'score', value: '21'},
          {name: '8', key: 'score', value: '24'},
          {name: '9', key: 'score', value: '27'},
          {name: '10', key: 'score', value: '30'},
          {name: '11', key: 'score', value: '33'},
          {name: '12', key: 'score', value: '36'},
          {name: '13', key: 'score', value: '39'},
          {name: '14', key: 'score', value: '42'},
          {name: '15', key: 'score', value: '45'},
          {name: '16', key: 'score', value: '48'},
          {name: '17', key: 'score', value: '51'},
          {name: '18', key: 'score', value: '54'},
          {name: '19', key: 'score', value: '57'},
          {name: '20', key: 'score', value: '60'},
        ],
      },
    ],
    isNumeric: true,
    abbreviation: '🌾',
  },
  {
    id: 'structureBonus',
    name: 'STRUCTURE',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many structure bonus you have',
        options: [
          {name: '0', key: 'score', value: '0'},
          {name: '1', key: 'score', value: '1'},
          {name: '2', key: 'score', value: '2'},
          {name: '3', key: 'score', value: '3'},
          {name: '4', key: 'score', value: '4'},
          {name: '5', key: 'score', value: '5'},
          {name: '6', key: 'score', value: '6'},
          {name: '7', key: 'score', value: '7'},
          {name: '8', key: 'score', value: '8'},
          {name: '9', key: 'score', value: '9'},
        ],
      },
    ],
    isNumeric: true,
    abbreviation: '🏛️',
  },
];

export default class ScytheData {
  static game = game;
  static scoringCategories = scoringCategories;
}
