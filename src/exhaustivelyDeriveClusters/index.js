import cellClusters from '../cellClusters';
import derivedClustersFromClusters from '../derivedClustersFromClusters';
import {isEqual, isEmpty, unionWith} from 'lodash';

export default (game) => {
  let clusters = cellClusters(game);
  for (;;) {
    const newClusters = derivedClustersFromClusters(clusters);
    if (isEmpty(newClusters)) return clusters;
    clusters = unionWith(clusters, newClusters, isEqual);
  }
};
