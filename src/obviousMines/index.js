import {filter, unionWith, isEqual} from 'lodash';
import cellNeighbours from '../cellNeighbours';
import eachRevealedCell from '../eachRevealedCell';
import {cellStates} from 'mines';

export default (game) => {
  let obviousMines = [];

  eachRevealedCell(game, (cell, count) => {
    const neighbours = cellNeighbours(game.dimensions, cell);
    const unmarkedNeighbours = filter(neighbours, (neighbour) => {
      return game.cellState(neighbour) === cellStates.UNKNOWN;
    });
    const markedNeighbours = filter(neighbours, (neighbour) => {
      return game.cellState(neighbour) === cellStates.MARKED;
    });
    if (unmarkedNeighbours.length + markedNeighbours.length <= count) {
      obviousMines = unionWith(obviousMines, unmarkedNeighbours, isEqual);
    }
  });

  return obviousMines;
};
