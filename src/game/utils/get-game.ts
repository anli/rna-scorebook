import {AgricolaData, ScytheData} from '../data';
import {GameId} from '../types';

const games = {
  agricola: {
    id: AgricolaData.game.id,
    name: AgricolaData.game.name,
    scoreCategories: AgricolaData.scoreCategories,
  },
  scythe: {
    id: ScytheData.game.id,
    name: ScytheData.game.name,
    scoreCategories: ScytheData.scoreCategories,
  },
};

const getGame = (id: GameId) => games[id];

export default getGame;
