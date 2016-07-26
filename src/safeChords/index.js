import {unionWith, isEqual} from 'lodash';
import neighboursWithState from '../neighboursWithState';
import eachRevealedCell from '../eachRevealedCell';
import {cellStates} from 'mines';

export default (game) => {
  let safeChords = [];

  eachRevealedCell(game, (cell, count) => {
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);
    if (markedNeighbours.length === count) {
      safeChords = unionWith(safeChords, [cell], isEqual);
    }
  });

  return safeChords;
};
