import {unionWith, isEqual} from 'lodash';
import neighboursWithState from '../neighboursWithState';
import eachRevealedCell from '../eachRevealedCell';
import {cellStates} from 'mines';

export default (game) => {
  let obviousMines = [];

  eachRevealedCell(game, (cell, count) => {
    const unmarkedNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);
    if (unmarkedNeighbours.length + markedNeighbours.length <= count) {
      obviousMines = unionWith(obviousMines, unmarkedNeighbours, isEqual);
    }
  });

  return obviousMines;
};
