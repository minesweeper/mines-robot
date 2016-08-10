import {times, constant, isEqual} from 'lodash';
import clusterNeighbours from '../clusterNeighbours';

export default (cells) => {
  const numberOfCells = cells.length;
  if (numberOfCells === 1) { return true; }

  const expectedNumberOfOnes = 2;
  const expectedNumberOfTwos = numberOfCells - 2;
  const expectedArray = times(expectedNumberOfOnes, constant(1)).concat(times(expectedNumberOfTwos, constant(2)));
  const neighbours = clusterNeighbours(cells).sort((a, b) => a - b);
  return isEqual(expectedArray, neighbours);
};
