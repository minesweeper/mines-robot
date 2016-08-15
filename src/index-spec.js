import robot from '.';
import helpers from './helpers';
import {gameStates} from 'mines';
import mines from 'mines';
import expect from 'expect';

describe('robot', () => {
  let game = null;

  beforeEach(() => {
    game = mines.createTest(`
      . . . .
      . * * .
      . . . .
    `);
  });

  describe('taking a turn', () => {
    const originalMarkMines = helpers.markMines;
    const originalRevealSafeCells = helpers.revealSafeCells;
    const originalGuess = helpers.guess;
    let calls = [];
    const markedMines = [];
    let safeCells = null;
    const guessedCells = [];

    beforeEach(() => {
      calls = [];
      helpers.markMines = () => {
        calls.push('markMines');
        return markedMines;
      };
      helpers.revealSafeCells = () => {
        calls.push('revealSafeCells');
        return safeCells;
      };
      helpers.guess = () => {
        calls.push('guess');
        return guessedCells;
      };
    });

    afterEach(() => {
      helpers.markMines = originalMarkMines;
      helpers.revealSafeCells = originalRevealSafeCells;
      helpers.guess = originalGuess;
    });

    it('should guess if no cells are safe to reveal', () => {
      safeCells = [];
      robot.takeTurn(game);
      expect(calls).toEqual(['markMines', 'revealSafeCells', 'guess']);
    });

    it('should guess if any cells are safe to reveal', () => {
      safeCells = [[0, 0]];
      robot.takeTurn(game);
      expect(calls).toEqual(['markMines', 'revealSafeCells']);
    });
  });

  describe('winning a game', () => {
    it('can win an expert game without guessing', () => {
      game = mines.createTest(`
        . . . . . . . . . * * . . . * . . . . . . . . . . . . . * .
        . . . * . * . . . . . . . . * . . . * . . . * * * . * . . .
        . . . . . . . . . . . . * . * * . . . . * * . . . . * . . .
        * . . . * . * * . . . . . * . . . . . . . . . . . . . . * .
        . . . . . . . . . . . * . . * . . . . . . . . . . * . . * .
        * . . . . . . . . . * * . . . . . . . . . . * . . * . . . .
        . . . . . . . . . . . . . . . . * * . . * . . . . . * . . .
        * * * . . . . . . * . . . . . . . . . . . . * . . . * . * .
        * . * . . * . * . . . . . . * * . . . . * . . . . * . . . .
        . . . * * . * . . . . . . . . . . . . . . . . . . . . . . *
        . . . . . . . . * . . . * . . . . . * . . . * . . . . . . .
        . . * . . . . * . . * . . . . . . * . . . . . * . * * . * .
        . . . . * . . . . . * * . . * . . . * * . . . . * . . . . .
        . . . * . . . . * . * . . . . . . * . . * * . . * . . * . *
        . * * . * * . . . . * * * * . . * . . . . . * . . . . . . *
        . . . . . . . . . . . . . . . * . . . . * . * . . . . * . .
      `);
      while (game.state() === gameStates.NOT_STARTED || game.state() === gameStates.STARTED) {
        robot.takeTurn(game);
      }
      expect(game.state()).toEqual(gameStates.WON);
    });
  });
});
