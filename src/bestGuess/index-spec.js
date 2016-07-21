import bestGuess from '.';
import mines from 'mines';
import expect from 'expect';

describe('bestGuess', () => {
  it('should just choose the first available cell', () => {
    const game = mines.createTest(`
      . *
    `);
    expect(bestGuess(game)).toEqual([0, 0]);
  });
});
