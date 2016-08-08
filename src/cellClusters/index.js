import neighboursWithState from '../neighboursWithState';
import eachRevealedCell from '../eachRevealedCell';
import {cellStates} from 'mines';
import {each, isEqual} from 'lodash';

export default (game) => {
  const cellClusters = [];

  eachRevealedCell(game, (cell, count) => {
    const unmarkedNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);

    if (unmarkedNeighbours.length > 0) {
      let sameRow = true;
      let sameCol = true;
      const firstRow = unmarkedNeighbours[0][0];
      const firstCol = unmarkedNeighbours[0][1];

      each(unmarkedNeighbours, (neighbour) => {
        if (neighbour[0] !== firstRow) { sameRow = false; }
        if (neighbour[1] !== firstCol) { sameCol = false; }
      });

      if ((sameRow || sameCol) && unmarkedNeighbours.length - markedNeighbours.length >= count) {
        let exists = false;
        const newCluster = [count, unmarkedNeighbours];
        each(cellClusters, (existingCluster) => {
          if (isEqual(existingCluster, newCluster)) { exists = true; }
        });
        if (exists === false) { cellClusters.push(newCluster); }
      }
    }
  });
  return cellClusters;
};
