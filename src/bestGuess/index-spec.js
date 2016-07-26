import bestGuess from '.';
import mines from 'mines';
import expect from 'expect';
import {each} from 'lodash';

describe('bestGuess', () => {
  let game = null;

  const mark = function() {
    each(arguments, (cell) => { game.mark(cell); });
  };
  it('should just choose the first unknown cell', () => {
    game = mines.createTest(`
      . *
    `);
    expect(bestGuess(game)).toEqual([0, 0]);
  });

  it('should just choose the first unknown cell', () => {
    game = mines.createTest(`
      * * .
      . . .
    `);
    mark([0, 0]);
    expect(bestGuess(game)).toEqual([0, 1]);
  });
});
