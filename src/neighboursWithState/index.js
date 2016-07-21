import {filter} from 'lodash';
import cellNeighbours from '../cellNeighbours';

export default (game, cell, state) => filter(
  cellNeighbours(game.dimensions, cell),
  (neighbour) => game.cellState(neighbour) === state
);
