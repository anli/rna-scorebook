import {Game, ScoreCategory} from '../types';

const game: Game = {
  id: 'sushiGoParty',
  name: 'Sushi Go Party!',
};

const scoreCategories: ScoreCategory[] = [
  {
    id: 'eggNigiri',
    name: 'EGG NIGIRI',
    typeId: 'nigiri',
    configs: [
      {
        typeId: 'all',
        question: 'Count how many egg nigiri cards you have',
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
        ],
      },
    ],
  },
  {
    id: 'salmonNigiri',
    name: 'SALMON NIGIRI',
    typeId: 'nigiri',
    scoreConfigMap: {
      question: 'Count how many salmon nigiri cards you have',
      options: [
        {name: '0', value: '0'},
        {name: '1', value: '2'},
        {name: '2', value: '4'},
        {name: '3', value: '6'},
        {name: '4', value: '8'},
        {name: '5', value: '10'},
        {name: '6', value: '12'},
        {name: '7', value: '14'},
        {name: '8', value: '16'},
        {name: '9', value: '18'},
        {name: '10', value: '20'},
        {name: '11', value: '22'},
        {name: '12', value: '24'},
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
        {name: '0', value: '0'},
        {name: '1', value: '3'},
        {name: '2', value: '6'},
        {name: '3', value: '9'},
        {name: '4', value: '12'},
        {name: '5', value: '15'},
        {name: '6', value: '18'},
        {name: '7', value: '21'},
        {name: '8', value: '24'},
        {name: '9', value: '27'},
        {name: '10', value: '30'},
        {name: '11', value: '33'},
        {name: '12', value: '36'},
      ],
    },
  },
];

export default class ScytheData {
  static game = game;
  static scoreCategories = scoreCategories;
}
