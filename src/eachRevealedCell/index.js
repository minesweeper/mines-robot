import eachCell from '../eachCell';
import {each, range} from 'lodash';
import {cellStates} from 'mines';

export default (game, cb) => {
  eachCell(game, (cell, cellState) => {
    each(range(1, 9), (index) => {
      // eslint-disable-next-line callback-return
      if (cellState === cellStates[index]) cb(cell, index);
    });
  });
};
