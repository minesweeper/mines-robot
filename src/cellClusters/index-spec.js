import mines, {gameStates} from 'mines';
import expect from 'expect';
import obviousMines from '../obviousMines/.';
import safeChords from '../safeChords/.';
import cellClusters from '.';
import {each} from 'lodash';

describe('cellClusters', () => {
  let game = null;

  const reveal = function() {
    each(arguments, (cell) => {
      expect(game.reveal(cell)).toEqual(gameStates.STARTED);
    });
  };

  it('should have a minimum size of one cell', () => {
    game = mines.createTest(`
      . * .
    `);
    reveal([0, 2]);
    // . . 1
    expect(cellClusters(game)).toEqual([[1, [[0, 1]]]]);
  });

  it('should have a maximum size of seven cells', () => {
    game = mines.createTest(`
      * * * .
      * . * *
      * . * .
    `);
    reveal([1, 1], [2, 1]);
    // . . . .
    // . 7 . .
    // . 4 . .
    expect(cellClusters(game)).toEqual([
      [7, [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]]]
    ]);
  });

  it('should not return non-sequential cells', () => {
    game = mines.createTest(`
      . . . *
      . * . .
    `);
    reveal([0, 1], [1, 2]);
    // . 1 . .
    // . . 2 .
    expect(cellClusters(game)).toEqual([]);
  });

  it('should return sequential cells', () => {
    game = mines.createTest(`
      . . .
      . . *
    `);
    reveal([1, 1]);
    // . . .
    // . 1 .
    expect(cellClusters(game)).toEqual([
      [1, [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2]]]
    ]);
  });

  it('should analyse a game and return cell clusters', () => {
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
    expect(cellClusters(game)).toEqual([
      [1, [[0, 3], [1, 3]]],
      [1, [[2, 0], [2, 1]]],
      [1, [[2, 0], [2, 1], [2, 2]]],
      [2, [[0, 3], [1, 3], [2, 1], [2, 2], [2, 3]]]
    ]);
  });

  it('should analyse a game and return cell clusters taking flagged cells into account', () => {
    game = mines.createTest(`
      . . . .
      . . . *
      * . . *
    `);
    reveal([0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]);
    game.mark([1, 3]);
    // 0 0 1 .
    // 1 1 2 F
    // . . . .
    expect(obviousMines(game)).toEqual([]);
    expect(safeChords(game)).toEqual([[0, 2]]);
    expect(cellClusters(game)).toEqual([
      [1, [[2, 0], [2, 1]]],
      [1, [[2, 0], [2, 1], [2, 2]]]
    ]);
  });

  it('should analyse a game and return cell clusters - more complex', () => {
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
    expect(cellClusters(game)).toEqual([
      [1, [[1, 3]]],
      [1, [[0, 4], [1, 3], [1, 4]]],
      [1, [[3, 0], [3, 1]]],
      [1, [[3, 0], [3, 1], [3, 2]]],
      [2, [[1, 3], [1, 4], [2, 4], [3, 2], [3, 3], [3, 4]]]
    ]);
  });

  it('should analyse a game and return cell clusters taking flagged cells into account 3', () => {
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
    expect(cellClusters(game)).toEqual([
      [2, [[3, 0], [3, 1]]],
      [2, [[3, 0], [3, 1], [3, 2]]],
      [1, [[3, 1], [3, 2], [3, 3]]],
      [1, [[3, 2], [3, 3], [3, 4]]],
      [1, [[3, 3], [3, 4]]]
    ]);
  });

  it('should analyse a game and return cell clusters 1-1 pattern', () => {
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
    expect(cellClusters(game)).toEqual([
      [1, [[2, 0], [2, 1]]],
      [1, [[2, 0], [2, 1], [2, 2]]],
      [1, [[2, 1], [2, 2], [2, 3]]],
      [1, [[2, 2], [2, 3], [2, 4]]],
      [1, [[2, 3], [2, 4]]]
    ]);
  });

  it('should analyse a game and return cell clusters 1-2 pattern', () => {
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
    expect(cellClusters(game)).toEqual([
      [1, [[2, 0], [2, 1]]],
      [2, [[2, 0], [2, 1], [2, 2]]],
      [1, [[2, 1], [2, 2], [2, 3]]],
      [1, [[2, 2], [2, 3], [2, 4]]],
      [1, [[2, 3], [2, 4], [2, 5]]],
      [1, [[2, 4], [2, 5]]]
    ]);
  });

  it('should analyse a game and return cell clusters vertical pattern', () => {
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
    expect(cellClusters(game)).toEqual([
      [1, [[1, 0], [1, 1]]],
      [1, [[1, 1], [2, 1], [3, 1]]],
      [1, [[3, 5]]],
      [2, [[2, 1], [3, 1], [4, 1], [4, 2], [4, 3]]],
      [1, [[4, 2], [4, 3], [4, 4]]],
      [2, [[3, 5], [4, 3], [4, 4], [4, 5]]]
    ]);
  });

  it('should analyse a game and return cell clusters corners', () => {
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
    expect(cellClusters(game)).toEqual([
      [1, [[0, 4], [1, 4]]],
      [2, [[2, 0], [2, 1]]],
      [2, [[0, 4], [1, 4], [2, 3], [2, 4]]],
      [2, [[2, 1], [2, 3], [3, 1], [3, 2], [3, 3]]]
    ]);
  });
});
