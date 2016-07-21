import obviousMines from '.';
import mines from 'mines';
import {gameStates} from 'mines';
import expect from 'expect';
import {each} from 'lodash';

describe('obviousMines', () => {
  let game = null;

  const reveal = function() {
    each(arguments, (cell) => {
      expect(game.reveal(cell)).toEqual(gameStates.STARTED);
    });
  };

  const mark = function() {
    each(arguments, (cell) => { game.mark(cell); });
  };

  it('should know an obvious mine when there is one unrevealed mine neighbouring a "one" cell', () => {
    game = mines.createTest(`
      . * .
      . . .
    `);
    reveal([0, 0], [1, 0], [1, 1]);
    expect(obviousMines(game)).toEqual([[0, 1]]);
  });

  it('should not find an obvious mine when they are already marked', () => {
    game = mines.createTest(`
      . * .
      . . .
    `);
    reveal([0, 0], [1, 0], [1, 1]);
    mark([0, 1]);
    expect(obviousMines(game)).toEqual([]);
  });

  it('should know an obvious mine when there are two unrevealed mines neighbouring a "two" cell', () => {
    game = mines.createTest(`
      * . *
      . . .
      . . .
    `);
    reveal([0, 1], [1, 0], [1, 1], [1, 2]);
    expect(obviousMines(game)).toEqual([[0, 0], [0, 2]]);
  });

  it('should know a single obvious mine when there are two unrevealed mines neighbouring a "two" cell, one already flagged', () => {
    game = mines.createTest(`
      * . * . . *
    `);
    mark([0, 0]);
    reveal([0, 1]);
    expect(obviousMines(game)).toEqual([[0, 2]]);
  });

  it('should know an obvious mine when there are two unrevealed mines neighbouring a "two" cell', () => {
    game = mines.createTest(`
      * . *
      * . .
      . . .
    `);
    reveal([0, 1], [1, 1], [1, 2]);
    expect(obviousMines(game)).toEqual([[0, 0], [0, 2], [1, 0]]);
  });
});
