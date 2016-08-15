import {each, isEqual, unionWith} from 'lodash';
import exhaustivelyDeriveClusters from '../exhaustivelyDeriveClusters';

export default (game) => {
  let safeCellsFromClusters = [];
  const clusters = exhaustivelyDeriveClusters(game);

  each(clusters, (cluster) => {
    const [clusterCount, clusterCells] = cluster;
    if (clusterCount === 0) {
      safeCellsFromClusters = unionWith(safeCellsFromClusters, clusterCells, isEqual);
    }
  });

  return safeCellsFromClusters;
};
