import neighboursWithState from '../neighboursWithState';
import eachRevealedCell from '../eachRevealedCell';
import isSequential from '../isSequential';
import {cellStates} from 'mines';
import {each, isEqual} from 'lodash';

export default (game) => {
  const cellClusters = [];

  eachRevealedCell(game, (cell, count) => {
    const unmarkedNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);
    const numberRemainingCells = count - markedNeighbours.length;

    if (numberRemainingCells > 0 && isSequential(unmarkedNeighbours)) {
      let exists = false;
      const newCluster = [numberRemainingCells, unmarkedNeighbours];
      each(cellClusters, (existingCluster) => {
        if (isEqual(existingCluster, newCluster)) { exists = true; }
      });
      if (exists === false) { cellClusters.push(newCluster); }
    }
  });
  return cellClusters;
};
