import mineProbabilities from '.';
import mines from 'mines';
import expect from 'expect';
import {cellStates} from 'mines';

describe('mineProbability', () => {
  let game = null;

  it('should return nothing for a non-started game', () => {
    game = mines.createTest(`
      . . .
      . . .
      . . *
    `);
    const expectedProbabilities = [];
    expect(mineProbabilities(game)).toEqual(expectedProbabilities);
  });

  xit('should take into account remaining mine count for the game', () => {
    game = mines.createTest(`
      * . *
      * * *
    `);
    game.mark([0, 0]);
    game.mark([0, 2]);
    game.mark([1, 0]);
    game.mark([1, 1]);
    game.mark([1, 2]);
    const expectedProbabilities = [[0, 1], 0];
    expect(mineProbabilities(game)).toEqual(expectedProbabilities);
  });

  it('should return the probability for each cell around a number', () => {
    game = mines.createTest(`
      * . .
      . . .
      . . .
    `);
    game.reveal([1, 1]);
    expect(game.cellState([1, 1])).toEqual(cellStates[1]);
    const oneEighth = 1 / 8;
    const expectedProbabilities = [[[0, 0], oneEighth],
                                   [[0, 1], oneEighth],
                                   [[0, 2], oneEighth],
                                   [[1, 0], oneEighth],
                                   [[1, 2], oneEighth],
                                   [[2, 0], oneEighth],
                                   [[2, 1], oneEighth],
                                   [[2, 2], oneEighth]];
    expect(mineProbabilities(game)).toEqual(expectedProbabilities);
  });

  it('should return the  ordered probabilities for each cell around a number for multiple cells', () => {
    game = mines.createTest(`
      * . . . . *
      * . . . . .
      . . . . . .
    `);
    game.reveal([1, 1]);
    expect(game.cellState([1, 1])).toEqual(cellStates[2]);
    game.reveal([1, 4]);
    expect(game.cellState([1, 4])).toEqual(cellStates[1]);
    const oneEighth = 1 / 8;
    const oneQuarter = 2 / 8;
    const expectedProbabilities = [[[0, 3], oneEighth],
                                   [[0, 4], oneEighth],
                                   [[0, 5], oneEighth],
                                   [[1, 3], oneEighth],
                                   [[1, 5], oneEighth],
                                   [[2, 3], oneEighth],
                                   [[2, 4], oneEighth],
                                   [[2, 5], oneEighth],
                                   [[0, 0], oneQuarter],
                                   [[0, 1], oneQuarter],
                                   [[0, 2], oneQuarter],
                                   [[1, 0], oneQuarter],
                                   [[1, 2], oneQuarter],
                                   [[2, 0], oneQuarter],
                                   [[2, 1], oneQuarter],
                                   [[2, 2], oneQuarter]];
    expect(mineProbabilities(game)).toEqual(expectedProbabilities);
  });

  it('should return the probability for each cell around a number taking into account flags', () => {
    game = mines.createTest(`
      * . .
      * . .
      . . .
    `);
    game.mark([0, 0]);
    game.reveal([1, 1]);
    expect(game.cellState([1, 1])).toEqual(cellStates[2]);
    const oneSeventh = 1 / 7;
    const expectedProbabilities = [[[0, 1], oneSeventh],
                                   [[0, 2], oneSeventh],
                                   [[1, 0], oneSeventh],
                                   [[1, 2], oneSeventh],
                                   [[2, 0], oneSeventh],
                                   [[2, 1], oneSeventh],
                                   [[2, 2], oneSeventh]];
    expect(mineProbabilities(game)).toEqual(expectedProbabilities);
  });

  it('should return the probability only once when there is multiple cells to calculate probability', () => {
    game = mines.createTest(`
      . * .
      . . .
    `);
    game.reveal([0, 0]);
    expect(game.cellState([0, 0])).toEqual(cellStates[1]);
    game.reveal([1, 0]);
    expect(game.cellState([1, 0])).toEqual(cellStates[1]);
    const oneHalf = 1 / 2;
    const expectedProbabilities = [[[0, 1], oneHalf],
                                   [[1, 1], oneHalf]];
    expect(mineProbabilities(game)).toEqual(expectedProbabilities);
  });
});
