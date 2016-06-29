import robot from '.';

describe('robot', () => {
  it('should be initialised with a game and then take turns', () => {
    const game = {};
    const player = robot(game);
    player.takeTurn();
  });
});
