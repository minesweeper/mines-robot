import eachCell from '../eachCell';
import {cellStates} from 'mines';
import mineProbabilities from '../mineProbabilities';

export default (game) => {
  const orderedCells = mineProbabilities(game);
  if (orderedCells.length > 0) {
    return orderedCells[0][0];
  }
  let bestGuess = null;
  eachCell(game, (cell, cellState) => {
    if (!bestGuess && cellState === cellStates.UNKNOWN) {
      bestGuess = cell;
    }
  });
  return bestGuess;
};
