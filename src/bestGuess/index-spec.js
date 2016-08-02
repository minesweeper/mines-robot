import bestGuess from '.';
import mines from 'mines';
import expect from 'expect';
import {each} from 'lodash';

describe('bestGuess', () => {
  let game = null;

  const mark = function() {
    each(arguments, (cell) => { game.mark(cell); });
  };
  it('should just choose the first unknown cell when the game hasn\'t started', () => {
    game = mines.createTest(`
      . *
    `);
    expect(bestGuess(game)).toEqual([0, 0]);
  });

  it('should just choose the first unknown cell when the game hasn\'t started, even if a cell has been marked', () => {
    game = mines.createTest(`
      * * .
      . . .
    `);
    mark([0, 0]);
    expect(bestGuess(game)).toEqual([0, 1]);
  });
});
