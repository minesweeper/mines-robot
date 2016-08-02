import eachCell from '../eachCell';
import {cellStates, gameStates} from 'mines';
import mineProbabilities from '../mineProbabilities';

export default (game) => {
  if (game.state() === gameStates.NOT_STARTED) {
    let bestGuess = null;
    eachCell(game, (cell, cellState) => {
      if (!bestGuess && cellState === cellStates.UNKNOWN) {
        bestGuess = cell;
      }
    });
    return bestGuess;
  }
  const orderedCells = mineProbabilities(game);
  return orderedCells[0][0];
};
