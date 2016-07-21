import {times} from 'lodash';

export default (game, cb) => {
  const [rows, cols] = game.dimensions;
  times(rows, (row) => {
    times(cols, (col) => {
      const cell = [row, col];
      cb(cell, game.cellState(cell));
    });
  });
};
