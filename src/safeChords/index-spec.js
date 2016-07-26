import safeChords from '.';
import mines from 'mines';
import {gameStates} from 'mines';
import expect from 'expect';
import {each} from 'lodash';

describe('safeChords', () => {
  let game = null;

  const reveal = function() {
    each(arguments, (cell) => {
      expect(game.reveal(cell)).toEqual(gameStates.STARTED);
    });
  };

  const mark = function() {
    each(arguments, (cell) => { game.mark(cell); });
  };

  it('should know a cell to chord when there is one flagged mine neighbouring a "one" cell', () => {
    game = mines.createTest(`
      * . .
      . . .
      . . .
    `);
    reveal([1, 1]);
    mark([0, 0]);
    expect(safeChords(game)).toEqual([[1, 1]]);
  });

  it('should not find a cell to chord when there is no flagged mines neighbouring a "one" cell', () => {
    game = mines.createTest(`
      * . .
      . . .
      . . .
    `);
    reveal([1, 1]);
    expect(safeChords(game)).toEqual([]);
  });
});
