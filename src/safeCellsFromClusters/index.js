import {each, isEqual, unionWith, filter, some} from 'lodash';
import cellClusters from '../cellClusters';

export default (game) => {
  let safeCellsFromClusters = [];
  const clusters = cellClusters(game);
  each(clusters, (firstCluster, firstIndex) => {

    each(clusters, (secondCluster, secondIndex) => {
      const firstClusterLength = firstCluster[1].length;
      const secondClusterLength = secondCluster[1].length;
      if (firstIndex !== secondIndex && firstCluster[0] === secondCluster[0] && firstClusterLength !== secondClusterLength) {
        let difference = null;

        if (firstClusterLength > secondClusterLength) {
          difference = filter(firstCluster[1], (b_item) => { return !some(secondCluster[1], (a_item) => { return isEqual(a_item, b_item); }); });
        } else {
          difference = filter(secondCluster[1], (b_item) => { return !some(firstCluster[1], (a_item) => { return isEqual(a_item, b_item); }); });
        }
        const clusterCellCount = firstCluster[0];
        if (difference.length === clusterCellCount) {
          safeCellsFromClusters = unionWith(safeCellsFromClusters, difference, isEqual);
        }
      }
    });
  });
  return safeCellsFromClusters;
};
