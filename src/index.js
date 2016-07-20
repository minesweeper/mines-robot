import helpers from './helpers';
import {isEmpty} from 'lodash';

const takeTurn = (game) => {
  helpers.markMines(game);
  if (isEmpty(helpers.revealSafeCells(game))) {
    helpers.guess(game);
  }
};

module.exports = {takeTurn};
