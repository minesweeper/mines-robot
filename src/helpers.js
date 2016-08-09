import bestGuess from './bestGuess';
import obviousMines from './obviousMines';
import safeChords from './safeChords';
import safeCellsFromClusters from './safeCellsFromClusters';
import obviousMinesFromClusters from './obviousMinesFromClusters';
import {each} from 'lodash';

const markMines = (game) => {
  const mines = obviousMines(game);
  each(mines, (cell) => { game.mark(cell); });
  return mines;
};

const markMinesFromClusters = (game) => {
  const mines = obviousMinesFromClusters(game);
  each(mines, (cell) => { game.mark(cell); });
  return mines;
};

const revealSafeCells = (game) => {
  const safe = safeChords(game);
  each(safe, (cell) => { game.chord(cell); });
  return safe;
};

const revealSafeCellsFromClusters = (game) => {
  const safe = safeCellsFromClusters(game);
  each(safe, (cell) => { game.reveal(cell); });
  return safe;
};

const guess = (game) => {
  const cell = bestGuess(game);
  game.reveal(cell);
  return cell;
};

export default { markMines, markMinesFromClusters, revealSafeCells, revealSafeCellsFromClusters, guess };
