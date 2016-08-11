import {intersectionWith, isEqual} from 'lodash';

export default (cellsA, cellsB) => {
  return intersectionWith(cellsA, cellsB, isEqual).length > 0;
};
