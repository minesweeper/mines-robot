import {unionWith, isEqual} from 'lodash';
import neighboursWithState from '../neighboursWithState';
import eachRevealedCell from '../eachRevealedCell';
import {cellStates} from 'mines';

export default (game) => {
  let safeChords = [];

  eachRevealedCell(game, (cell, count) => {
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);
    const unknownNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    if (markedNeighbours.length === count && unknownNeighbours.length > 0) {
      safeChords = unionWith(safeChords, [cell], isEqual);
    }
  });

  return safeChords;
};
