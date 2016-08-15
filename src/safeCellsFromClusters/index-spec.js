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

  it('should be able to find a simple 1-1 pattern which determines a safe cell', () => {
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
      [0, 4], [1, 4], [3, 2]
    ]);
  });

  it('should analyse a game and return safe cells from clusters for a more complex game 2', () => {
    game = mines.createTest(`
      . . . . .
      . . . . .
      . . . . .
      * * . . *
    `);
    reveal([0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
           [1, 0], [1, 1], [1, 2], [1, 3], [1, 4]);
    // 0 0 0 0 0
    // 0 0 0 0 0
    // 2 2 1 1 1
    // . . . . .
    expect(obviousMines(game)).toEqual([[3, 0], [3, 1]]);
    expect(safeChords(game)).toEqual([]);
    expect(safeCellsFromClusters(game)).toEqual([
      [3, 2]
    ]);
  });

  it('should analyse a game and return safe cells from cell clusters 1-1 pattern', () => {
    game = mines.createTest(`
      . * * * .
      . . . . .
      * . . * .
      . . . . .
      . . . . .
    `);
    reveal([3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
           [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]);
    // . . . . .
    // . . . . .
    // . . . . .
    // 1 1 1 1 1
    // 0 0 0 0 0
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(safeCellsFromClusters(game)).toEqual([
      [2, 2]
    ]);
  });

  it('should analyse a game and return safe cells from clusters 1-2 pattern', () => {
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
    expect(safeCellsFromClusters(game)).toEqual([
      [2, 3], [2, 4], [2, 1]
    ]);
  });

  it('should analyse a game and return safe cells from clusters vertical pattern', () => {
    game = mines.createTest(`
      . . * . . .
      * . . . . .
      . . . . . .
      . * . . . *
      . . . * . .
    `);
    reveal([0, 0], [0, 1],
           [1, 2], [1, 3], [1, 4], [1, 5],
           [2, 2], [2, 3], [2, 4], [2, 5],
           [3, 2], [3, 3], [3, 4]);
    game.mark([0, 2]);
    // 1 2 F 1 0 0
    // . . 1 1 0 0
    // . . 1 0 1 1
    // . . 2 1 2 .
    // . . . . . .
    expect(obviousMines(game)).toEqual([[3, 5]]);
    expect(safeChords(game)).toEqual([[1, 2]]);
    expect(safeCellsFromClusters(game)).toEqual([
    ]);
  });

  it('should analyse a game and return safe cell clusters from corners', () => {
    game = mines.createTest(`
      . . . . *
      . . . . .
      * * . * .
      . . . . .
    `);
    reveal([0, 0], [0, 1], [0, 2], [0, 3],
           [1, 0], [1, 1], [1, 2], [1, 3],
           [2, 2]);
    // 0 0 0 1 .
    // 2 2 2 2 .
    // . . 2 . .
    // . . . . .
    expect(obviousMines(game)).toEqual([[2, 0], [2, 1], [2, 3]]);
    expect(safeChords(game)).toEqual([]);
    expect(safeCellsFromClusters(game)).toEqual([
    ]);
  });

  it('should analyse a game and return safe cell clusters from cell clusters in a complicated 1-2 pattern', () => {
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
    expect(safeCellsFromClusters(game)).toEqual([
      [2, 1]
    ]);
  });

  it('should analyse a game and return safe cells from non-adjacent cell clusters', () => {
    game = mines.createTest(`
      . * . * .
      . . . . .
    `);
    reveal([0, 0], [0, 2], [0, 4],
           [1, 0], [1, 4]);
    // 1 . 2 . 1
    // 1 . . . 1
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([]);
    expect(safeCellsFromClusters(game)).toEqual([
      [1, 2]
    ]);
  });
});
