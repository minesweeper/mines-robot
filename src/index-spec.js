import robot from '.';
import mines from 'mines';

describe('robot', () => {
  let game = null;

  before(() => {
    game = mines.createTest(`
      . . . .
      . * * .
      . . . .
    `);
  });

  describe('taking a turn', () => {
    it('should mark obvious mines', () => {
      robot.takeTurn(game);
    });
  });
});
