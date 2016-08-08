import neighboursWithState from '../neighboursWithState';
import eachRevealedCell from '../eachRevealedCell';
import {cellStates} from 'mines';

export default (game) => {
  const cellClusters = [];

  eachRevealedCell(game, (cell, count) => {
    const unmarkedNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);
    if (unmarkedNeighbours.length - markedNeighbours.length > count) {
        cellClusters.push([count, unmarkedNeighbours]);
    }
  });
  return cellClusters;
};
