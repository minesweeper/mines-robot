import {each, isEqual, unionWith} from 'lodash';
import cellClusters from '../cellClusters';
import clusterPairs from '../clusterPairs';
import clustersIntersect from '../clustersIntersect';
import leftDifference from '../leftDifference';

export default (game) => {
  let obviousMinesFromClusters = [];
  const clusters = cellClusters(game);
  const pairedClusters = clusterPairs(clusters);

  each(pairedClusters, (clusterPair) => {
    const [clusterOne, clusterTwo] = clusterPair;
    const [clusterOneCount, clusterOneCells] = clusterOne;
    const [clusterTwoCount, clusterTwoCells] = clusterTwo;

    if (clustersIntersect(clusterOneCells, clusterTwoCells)) {
      let difference = [];
      if (clusterOneCount === 1 && clusterTwoCount === 2) {
        difference = leftDifference(clusterTwoCells, clusterOneCells);
      }
      if (clusterOneCount === 2 && clusterTwoCount === 1) {
        difference = leftDifference(clusterOneCells, clusterTwoCells);
      }
      if (difference.length === 1) {
        obviousMinesFromClusters = unionWith(obviousMinesFromClusters, difference, isEqual);
      }
    }
  });
  return obviousMinesFromClusters;
};
