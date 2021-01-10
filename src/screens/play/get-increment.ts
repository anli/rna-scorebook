import R from 'ramda';

const menuItemsIncrementMap: {[key: string]: null | number[]} = {
  eggNigiri: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  salmonNigiri: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
  squidNigiri: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  temaki: [-4, 0, 4],
  uramaki: [0, 2, 5, 8],
  maki: [0, 3, 6],
  soySauce: [0, 4, 8, 12, 16],
  wasabi: null,
  spoon: null,
  chopsticks: null,
  takeoutBox: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  tea: null,
  specialOrder: null,
  menu: null,
  onigiri: null,
  edamame: null,
  tempura: [0, 5, 10, 15, 20],
  misoSoup: [0, 3, 6, 9, 12, 15, 18, 21, 24],
  sashimi: [0, 10, 20],
  eel: [-3, 0, 7],
  dumpling: [0, 1, 3, 6, 10, 15],
  tofu: [0, 2, 6],
  pudding: [-6, 0, 6],
  fruit: null,
  greenTeaIceCream: [0, 4, 8, 12],
};

const getIncrement = (
  menuItemId: string,
  score: number,
  isIncrease: boolean,
) => {
  const scores = menuItemsIncrementMap?.[menuItemId];

  if (Array.isArray(scores)) {
    const nextScore = getNextScore(scores, score, isIncrease);
    return !R.isNil(nextScore) ? Math.abs(nextScore - score) : 0;
  }

  return 1;
};

export default getIncrement;

const getNextScore = (
  scores: number[],
  currentScore: number,
  isIncrease: boolean,
) => {
  if (isIncrease) {
    return R.head(scores.filter((fixedScore) => fixedScore > currentScore));
  }
  return R.last(scores.filter((fixedScore) => fixedScore < currentScore));
};
