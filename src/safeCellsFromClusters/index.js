import {each, isEqual, unionWith} from 'lodash';
import cellClusters from '../cellClusters';
import clusterPairs from '../clusterPairs';
import clustersIntersect from '../clustersIntersect';
import fullDifference from '../fullDifference';

export default (game) => {
  let safeCellsFromClusters = [];
  const clusters = cellClusters(game);
  const pairedClusters = clusterPairs(clusters);

  each(pairedClusters, (clusterPair) => {
    const [clusterOne, clusterTwo] = clusterPair;
    const [clusterOneCount, clusterOneCells] = clusterOne;
    const [clusterTwoCount, clusterTwoCells] = clusterTwo;

    if (clustersIntersect(clusterOneCells, clusterTwoCells) && clusterOneCount === 1 && clusterTwoCount === 1) {
      const difference = fullDifference(clusterOneCells, clusterTwoCells);
      if (difference.length === 1) {
        safeCellsFromClusters = unionWith(safeCellsFromClusters, difference, isEqual);
      }
    }
  });
  return safeCellsFromClusters;
};
