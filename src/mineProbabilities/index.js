import {cellStates} from 'mines';
import eachRevealedCell from '../eachRevealedCell';
import addIfLower from '../addIfLower';
import eachCell from '../eachCell';
import neighboursWithState from '../neighboursWithState';
import {each, reverse} from 'lodash';

export default (game) => {
  let mineProbabilities = [];

  let totalUknownCellCount = 0;

  eachCell(game, (cell, cellState) => {
    if (cellState === cellStates.UNKNOWN) {
      totalUknownCellCount += 1;
    }
  });

  eachCell(game, (cell, cellState) => {
    if (cellState === cellStates.UNKNOWN) {
      let probability = null;
      const remainingMineCount = game.remainingMineCount();
      if (remainingMineCount === 0) {
        probability = 0;
      } else {
        probability = remainingMineCount / totalUknownCellCount;
      }
      mineProbabilities = addIfLower(mineProbabilities, cell, probability);
    }
  });

  eachRevealedCell(game, (cell, count) => {
    const unmarkedNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);
    const numberUnmarkedNeighbours = unmarkedNeighbours.length;
    const numberMarkedNeighbours = markedNeighbours.length;

    if (numberUnmarkedNeighbours > 0 && count > 0) {
      each(reverse(unmarkedNeighbours), (neighbour) => {
        const probability = (count - numberMarkedNeighbours) / numberUnmarkedNeighbours;
        mineProbabilities = addIfLower(mineProbabilities, neighbour, probability, false);
      });
    }
  });

  return mineProbabilities.sort((a, b) => {
    let difference = null;
    if (b[1] === a[1]) { // same probability - sort by index
      if (a[0][0] === b[0][0]) { // same row - sort by col
        difference = a[0][1] - b[0][1]; // difference in column values
      } else {
        difference = a[0][0] - b[0][0];
      }
    } else {
      difference = a[1] - b[1];
    }
    return difference;
  });
};
