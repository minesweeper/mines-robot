import {each, isEqual, unionWith} from 'lodash';
import cellClusters from '../cellClusters';
import fullDifference from '../fullDifference';

export default (game) => {
  let safeCellsFromClusters = [];
  const clusters = cellClusters(game);
  each(clusters, (firstCluster, firstIndex) => {
    each(clusters, (secondCluster, secondIndex) => {
      const firstClusterLength = firstCluster[1].length;
      const secondClusterLength = secondCluster[1].length;
      const firstClusterCells = firstCluster[1];
      const secondClusterCells = secondCluster[1];
      if (firstIndex !== secondIndex && firstCluster[0] === secondCluster[0] && firstClusterLength !== secondClusterLength) {
        const difference = fullDifference(firstClusterCells, secondClusterCells);
        const clusterCellCount = firstCluster[0];
        if (difference.length === clusterCellCount) {
          safeCellsFromClusters = unionWith(safeCellsFromClusters, difference, isEqual);
        }
      }
    });
  });
  return safeCellsFromClusters;
};
