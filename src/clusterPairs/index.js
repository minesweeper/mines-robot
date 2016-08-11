import {each, times} from 'lodash';

export default (clusters) => {
  const clusterPairs = [];
  each(clusters, (cluster, index) => {
    times(clusters.length - index - 1, (i) => {
      clusterPairs.push([cluster, clusters[index + i + 1]]);
    });
  });
  return clusterPairs;
};
