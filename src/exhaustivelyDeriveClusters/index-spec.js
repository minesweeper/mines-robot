import expect from 'expect';
import {each} from 'lodash';
import mines, {gameStates} from 'mines';
import obviousMines from '../obviousMines/.';
import safeChords from '../safeChords/.';
import exhaustivelyDeriveClusters from '.';

describe('exhaustivelyDeriveClusters', () => {
  let game = null;

  const reveal = function() {
    each(arguments, (cell) => {
      expect(game.reveal(cell)).toEqual(gameStates.STARTED);
    });
  };

  it('should analyse a game and exhuastively derive clusters', () => {
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
    expect(exhaustivelyDeriveClusters(game)).toEqual([
      [1, [[0, 1], [1, 1]]],
      [2, [[0, 1], [0, 3], [1, 1], [1, 2], [1, 3]]],
      [1, [[0, 3], [1, 3]]],
      [1, [[0, 3], [1, 2], [1, 3]]],
      [1, [[0, 1], [1, 1], [1, 2]]],
      [0, [[1, 2]]]
    ]);
  });
});
