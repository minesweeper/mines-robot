import neighboursWithState from '../neighboursWithState';
import eachRevealedCell from '../eachRevealedCell';
import {cellStates} from 'mines';
import {each, isEqual} from 'lodash';

export default (game) => {
  const cellClusters = [];

  eachRevealedCell(game, (cell, count) => {
    const unmarkedNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);

    if (unmarkedNeighbours.length > 0 && markedNeighbours.length < count) {
      let sameRow = true;
      let sameCol = true;
      const firstRow = unmarkedNeighbours[0][0];
      const firstCol = unmarkedNeighbours[0][1];

      each(unmarkedNeighbours, (neighbour) => {
        if (neighbour[0] !== firstRow) { sameRow = false; }
        if (neighbour[1] !== firstCol) { sameCol = false; }
      });

      let colSequential = true;
      if (sameRow) {
        let previousCol = null;
        each(unmarkedNeighbours, (neighbour, index) => {
          const currentCol = neighbour[1];
          if (index !== 0 && currentCol !== previousCol + 1) {
            colSequential = false;
          } else {
            previousCol = currentCol;
          }
        });
      }

      let rowSequential = true;
      if (sameCol) {
        let previousRow = null;
        each(unmarkedNeighbours, (neighbour, index) => {
          const currentRow = neighbour[0];
          if (index !== 0 && currentRow !== previousRow + 1) {
            rowSequential = false;
          } else {
            previousRow = currentRow;
          }
        });
      }

      if ((sameRow || sameCol) && rowSequential && colSequential && unmarkedNeighbours.length - markedNeighbours.length >= count) {
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
