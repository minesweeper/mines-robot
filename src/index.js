import helpers from './helpers';
import {isEmpty} from 'lodash';

const takeTurn = (game) => {
  const marked = helpers.markMines(game);
  const markedByClusters = helpers.markMinesFromClusters(game);
  const chorded = helpers.revealSafeCells(game);
  const revealed = helpers.revealSafeCellsFromClusters(game);
  if (isEmpty(marked) && isEmpty(markedByClusters) && isEmpty(chorded) && isEmpty(revealed)) {
    helpers.guess(game);
  }
};

module.exports = {takeTurn};
