import obviousMines from '.';
import mines from 'mines';
import {cellStates} from 'mines';
import expect from 'expect';

describe('obviousMines', () => {

  it('should know an obvious mine when there is one unrevealed mine neighbouring a "one" cell', () => {
    const game = mines.createTest(`
      . *
    `);
    game.reveal([0, 0]);
    expect(game.cellState([0, 0])).toEqual(cellStates[1]);
    expect(obviousMines(game)).toEqual([[0, 1]]);
  });

  it('should know an obvious mine when there are two unrevealed mines neighbouring a "two" cell', () => {
    const game = mines.createTest(`
      * . *
    `);
    game.reveal([0, 1]);
    expect(game.cellState([0, 1])).toEqual(cellStates[2]);
    expect(obviousMines(game)).toEqual([[0, 0], [0, 2]]);
  });

  it('should know an obvious mine when there are two unrevealed mines neighbouring a "two" cell', () => {
    const game = mines.createTest(`
      * . *
      * . .
    `);
    game.reveal([0, 1]);
    expect(game.cellState([0, 1])).toEqual(cellStates[3]);
    game.reveal([1, 1]);
    expect(game.cellState([1, 1])).toEqual(cellStates[3]);
    game.reveal([1, 2]);
    expect(game.cellState([1, 2])).toEqual(cellStates[1]);
    expect(obviousMines(game)).toEqual([[0, 0], [0, 2], [1, 0]]);
  });

});
