import eachCell from '../eachCell';
import {cellStates} from 'mines';

export default (game) => {
  let bestGuess = null;

  eachCell(game, (cell, cellState) => {
    if (!bestGuess && cellState === cellStates.UNKNOWN) {
      bestGuess = cell;
    }
  });

  return bestGuess;
};
