import {each, differenceWith, isEqual} from 'lodash';
import numberNeighbours from '../numberNeighbours';

export default (cells) => {
  const clusterNeighbours = [];
  each(cells, (cell) => {
    const differentCells = differenceWith(cells, [cell], isEqual);
    clusterNeighbours.push(numberNeighbours(cell, differentCells));
  });
  return clusterNeighbours;
};
