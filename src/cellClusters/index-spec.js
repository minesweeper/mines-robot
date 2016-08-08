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
      [1, [[2, 0], [2, 1], [2, 2]]],
      [2, [[0, 3], [2, 1], [2, 2], [2, 3]]]
    ]);
  });
});
