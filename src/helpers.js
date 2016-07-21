import bestGuess from './bestGuess';
import obviousMines from './obviousMines';
import {each} from 'lodash';

const markMines = (game) => {
  const mines = obviousMines(game);
  each(mines, (cell) => { game.mark(cell); });
  return mines;
};

const revealSafeCells = (game) => {
  const safeCells = [];
  each(safeCells, (cell) => { game.chord(cell); });
  return safeCells;
};

const guess = (game) => {
  const cell = bestGuess(game);
  game.chord(cell);
  return cell;
};

export default { markMines, revealSafeCells, guess };
