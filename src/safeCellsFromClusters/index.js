import {each, differenceWith, isEqual, unionWith} from 'lodash';
import cellClusters from '../cellClusters';

export default (game) => {
  let safeCellsFromClusters = [];

  const clusters = cellClusters(game);

  each(clusters, (firstCluster, firstIndex) => {
    each(clusters, (secondCluster, secondIndex) => {
      if (firstIndex !== secondIndex && firstCluster[0] === secondCluster[0]) {
        const difference = differenceWith(firstCluster[1], secondCluster[1], isEqual);
        const clusterCellCount = firstCluster[0];
        if (difference.length === clusterCellCount) {
          safeCellsFromClusters = unionWith(safeCellsFromClusters, difference, isEqual);
        }
      }
    });
  });
  return safeCellsFromClusters;
};
