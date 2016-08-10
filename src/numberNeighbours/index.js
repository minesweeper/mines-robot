import {filter} from 'lodash';
import areNeighbours from '../areNeighbours';

export default (cell, otherCells) => {
  return filter(otherCells, (otherCell) => {
    return areNeighbours(cell, otherCell);
  }).length;
};
