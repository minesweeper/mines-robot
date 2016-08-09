import expect from 'expect';
import {each} from 'lodash';
import mines, {gameStates} from 'mines';
import obviousMines from '../obviousMines/.';
import safeChords from '../safeChords/.';
import obviousMinesFromClusters from '.';

describe('safeCellsFromClusters', () => {
  let game = null;

  const reveal = function() {
    each(arguments, (cell) => {
      expect(game.reveal(cell)).toEqual(gameStates.STARTED);
    });
  };

  it('should analyse a game and return obvious mines from cell clusters 1-2 pattern', () => {
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
      [2, 2]
    ]);
  });
});
