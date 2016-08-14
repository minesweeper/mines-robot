import {each, unionWith, isEmpty} from 'lodash';
import clusterPairs from '../clusterPairs';
import clustersIntersect from '../clustersIntersect';
import leftDifference from '../leftDifference';
import isSequential from '../isSequential';
import intersection from '../intersection';

export default (clusters) => {
  let derivedClustersFromClusters = [];
  const pairedClusters = clusterPairs(clusters);

  each(pairedClusters, (clusterPair) => {
    let [clusterOne, clusterTwo] = clusterPair;
    if (clusterOne[1].length > clusterTwo[1].length) {
      [clusterTwo, clusterOne] = [clusterOne, clusterTwo];
    }
    const [clusterOneCount, clusterOneCells] = clusterOne;
    const [clusterTwoCount, clusterTwoCells] = clusterTwo;

    if (clustersIntersect(clusterOneCells, clusterTwoCells)) {
      const rightDiff = leftDifference(clusterTwoCells, clusterOneCells);
      const leftDiff = leftDifference(clusterOneCells, clusterTwoCells);
      if (isEmpty(leftDiff) && !isEmpty(rightDiff) && isSequential(rightDiff)) {
        const derivedClusters = [[(clusterTwoCount - clusterOneCount), rightDiff]];
        if (isEmpty(intersection(derivedClusters, clusters))) {
          derivedClustersFromClusters = unionWith(derivedClustersFromClusters, derivedClusters);
        }
      }
    }
  });

  return derivedClustersFromClusters;
};
