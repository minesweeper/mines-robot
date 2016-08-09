import {each, isEqual, unionWith, filter, some} from 'lodash';
import cellClusters from '../cellClusters';

export default (game) => {
  let obviousMinesFromClusters = [];
  const clusters = cellClusters(game);
  each(clusters, (firstCluster, firstIndex) => {
    each(clusters, (secondCluster, secondIndex) => {
      const firstClusterLength = firstCluster[1].length;
      const secondClusterLength = secondCluster[1].length;
      const firstClusterCount = firstCluster[0];
      const secondClusterCount = secondCluster[0];

      if (firstIndex !== secondIndex && firstClusterCount !== secondClusterCount && firstClusterLength !== secondClusterLength) {
         let difference = null;
         let clusterCellDifference = null;

         if (firstClusterLength > secondClusterLength) {
           difference = filter(firstCluster[1], (b_item) => { return !some(secondCluster[1], (a_item) => { return isEqual(a_item, b_item); }); });
           clusterCellDifference = firstClusterCount - secondClusterCount;
         } else {
           difference = filter(secondCluster[1], (b_item) => { return !some(firstCluster[1], (a_item) => { return isEqual(a_item, b_item); }); });
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
