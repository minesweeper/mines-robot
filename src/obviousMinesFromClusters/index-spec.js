import expect from 'expect';
import {each} from 'lodash';
import mines, {gameStates} from 'mines';
import obviousMines from '../obviousMines/.';
import safeChords from '../safeChords/.';
import obviousMinesFromClusters from '.';

describe('obviousMinesFromClusters', () => {
  let game = null;

  const reveal = function() {
    each(arguments, (cell) => {
      expect(game.reveal(cell)).toEqual(gameStates.STARTED);
    });
  };

  const mark = function() {
    each(arguments, (cell) => {
      expect(game.mark(cell)).toEqual(gameStates.STARTED);
    });
  };

  it('should analyse a game and return obvious mines from cell clusters in a simple 1-2 pattern', () => {
    game = mines.createTest(`
      . * * * . .
      . . . . . .
      * . * . . *
      . . . . . .
      . . . . . .
    `);
    reveal([3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5],
           [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]);
    // . . . . . .
    // . . . . . .
    // . . . . . .
    // 1 2 1 1 1 1
    // 0 0 0 0 0 0
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(obviousMinesFromClusters(game)).toEqual([
      [2, 2], [2, 0]
    ]);
  });

  it('should analyse a game and return obvious mines from cell clusters in a complicated 1-2 pattern', () => {
    game = mines.createTest(`
      * * * * . .
      . . * . * .
      * . . . . *
      . . . . . .
      . * . . . *
    `);
    reveal([2, 2], [2, 3], [2, 4],
           [3, 2], [3, 3], [3, 4],
           [4, 2], [4, 3], [4, 4]);
    // . . . . . .
    // . . . . . .
    // . . 1 2 2 .
    // . . 1 0 2 .
    // . . 1 0 1 .
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(obviousMinesFromClusters(game)).toEqual([
      [1, 4], [2, 5]
    ]);
  });

  it('should analyse a game and return obvious mines from cell clusters in a 1-2-1 pattern', () => {
    game = mines.createTest(`
      . . . . . . . .
      . * . * . * . .
      * . . . . . . .
      . . . . . . . *
    `);
    reveal([2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
           [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6]);
    // . . . . . . . .
    // . . . . . . . .
    // . 2 2 1 2 1 2 .
    // . 1 0 0 0 0 1 .
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(obviousMinesFromClusters(game)).toEqual([
      [1, 1], [1, 3], [1, 5]
    ]);
  });

  it('should analyse a game and return obvious mines from cell clusters in a 1-2-2-1 pattern', () => {
    game = mines.createTest(`
      * . . . . . . *
      . . . . . . . .
      * . . * * . . .
    `);
    reveal([0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
           [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6]);
    // . 1 0 0 0 0 1 .
    // . 2 1 2 2 1 1 .
    // . . . . . . . .
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(obviousMinesFromClusters(game)).toEqual([
      [2, 4], [2, 3]
    ]);
  });

  it('should analyse a game and return obvious mines from cell clusters taking into account flagged cells', () => {
    game = mines.createTest(`
      * . . . *
      . * . * .
      . . . . .
      . * . * .
    `);
    reveal([0, 1], [0, 2], [0, 3],
           [1, 2],
           [2, 1], [2, 2], [2, 3]);
    mark([1, 1], [1, 3]);
    // . 2 2 2 .
    // . F 2 F .
    // . 2 4 2 .
    // . . . . .
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(obviousMinesFromClusters(game)).toEqual([
      [3, 3], [3, 1]
    ]);
  });

  it('should analyse a game and return obvious mines from non-adjacent cell clusters', () => {
    game = mines.createTest(`
      . * . * .
      . . * . .
    `);
    reveal([0, 0], [0, 2], [0, 4],
           [1, 0], [1, 4]);
    // 1 . 3 . 1
    // 1 . . . 1
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(obviousMinesFromClusters(game)).toEqual([
      [1, 2]
    ]);
  });
});
