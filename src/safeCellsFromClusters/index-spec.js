import expect from 'expect';
import {each} from 'lodash';
import mines, {gameStates} from 'mines';
import obviousMines from '../obviousMines/.';
import safeChords from '../safeChords/.';
import safeCellsFromClusters from '.';

describe('safeCellsFromClusters', () => {
  let game = null;

  const reveal = function() {
    each(arguments, (cell) => {
      expect(game.reveal(cell)).toEqual(gameStates.STARTED);
    });
  };

  it('should analyse a game and return safe cells from cell clusters', () => {
    game = mines.createTest(`
      . . . .
      . . . *
      * . . *
    `);
    reveal([0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]);
    // 0 0 1 .
    // 1 1 2 .
    // . . . .
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(safeCellsFromClusters(game)).toEqual([
      [2, 2]
    ]);
  });

  it('should analyse a game and return safe cells from clusters for a more complex game', () => {
    game = mines.createTest(`
      . . . . . .
      . . . * . .
      . . . . . .
      * . . . * .
    `);
    reveal([0, 0], [0, 1], [0, 2], [0, 3],
           [1, 0], [1, 1], [1, 2],
           [2, 0], [2, 1], [2, 2], [2, 3]);
    // 0 0 1 1 . .
    // 0 0 1 . . .
    // 1 1 1 2 . .
    // . . . . . .
    expect(obviousMines(game)).toEqual([[1, 3]]);
    expect(safeChords(game)).toEqual([]);
    expect(safeCellsFromClusters(game)).toEqual([
      [1, 3], [3, 2]
    ]);
  });
});
