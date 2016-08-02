import helpers from './helpers';
import {isEmpty} from 'lodash';

const takeTurn = (game) => {
  const marked = helpers.markMines(game);
  const chorded = helpers.revealSafeCells(game);
  if (isEmpty(marked) && isEmpty(chorded)) {
    helpers.guess(game);
  }
};

module.exports = {takeTurn};
