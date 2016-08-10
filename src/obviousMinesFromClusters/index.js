import {each, isEqual, unionWith} from 'lodash';
import cellClusters from '../cellClusters';
import fullDifference from '../fullDifference';

export default (game) => {
  let obviousMinesFromClusters = [];
  const clusters = cellClusters(game);
  each(clusters, (firstCluster, firstIndex) => {
    each(clusters, (secondCluster, secondIndex) => {
      const firstClusterLength = firstCluster[1].length;
      const secondClusterLength = secondCluster[1].length;
      const firstClusterCount = firstCluster[0];
      const secondClusterCount = secondCluster[0];
      const firstClusterCells = firstCluster[1];
      const secondClusterCells = secondCluster[1];

      if (firstIndex !== secondIndex && firstClusterCount !== secondClusterCount && firstClusterLength !== secondClusterLength) {
         const difference = fullDifference(firstClusterCells, secondClusterCells);
         let clusterCellDifference = null;

         if (firstClusterLength > secondClusterLength) {
           clusterCellDifference = firstClusterCount - secondClusterCount;
         } else {
           clusterCellDifference = secondClusterCount - firstClusterCount;
         }
         if (difference.length === clusterCellDifference) {
           obviousMinesFromClusters = unionWith(obviousMinesFromClusters, difference, isEqual);
         }
       }
    });
  });
  return obviousMinesFromClusters;
};
