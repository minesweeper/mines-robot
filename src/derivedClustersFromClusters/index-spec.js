import expect from 'expect';
import derivedClustersFromClusters from '.';

describe('derivedClustersFromClusters', () => {
  it('should find a derived cluster within two clusters with larger cluster on left', () => {
    const clusterOne = [1, [[0, 0], [0, 1]]];
    const clusterTwo = [2, [[0, 0], [0, 1], [0, 2], [1, 2]]];

    const result = derivedClustersFromClusters([clusterOne, clusterTwo]);
    expect(result).toEqual([[1, [[0, 2], [1, 2]]]]);
  });

  it('should not find a derived cluster between two identical two clusters', () => {
    const clusterOne = [1, [[0, 0], [0, 1]]];
    const clusterTwo = [1, [[0, 0], [0, 1]]];

    const result = derivedClustersFromClusters([clusterOne, clusterTwo]);
    expect(result).toEqual([]);
  });

  it('should not find a derived cluster that is already present', () => {
    const clusterOne = [1, [[0, 0], [0, 1]]];
    const clusterTwo = [2, [[0, 0], [0, 1], [0, 2], [1, 2]]];
    const clusterThree = [1, [[0, 2], [1, 2]]];

    const result = derivedClustersFromClusters([clusterOne, clusterTwo, clusterThree]);
    expect(result).toEqual([]);
  });

  it('should find a derived cluster within two clusters with larger cluster on right', () => {
    const clusterOne = [2, [[0, 0], [0, 1], [0, 2], [1, 2]]];
    const clusterTwo = [1, [[0, 0], [0, 1]]];

    const result = derivedClustersFromClusters([clusterOne, clusterTwo]);
    expect(result).toEqual([[1, [[0, 2], [1, 2]]]]);
  });

  it('should not find a derived cluster for two clusters that do not intersect', () => {
    const clusterOne = [1, [[0, 2], [1, 2]]];
    const clusterTwo = [1, [[0, 0], [0, 1]]];

    const result = derivedClustersFromClusters([clusterOne, clusterTwo]);
    expect(result).toEqual([]);
  });

  it('should not find a derived cluster for two clusters where one is not a subset of the other', () => {
    const clusterOne = [1, [[0, 0], [0, 1], [0, 2]]];
    const clusterTwo = [1, [[0, 1], [0, 2], [1, 2]]];

    const result = derivedClustersFromClusters([clusterOne, clusterTwo]);
    expect(result).toEqual([]);
  });

  it('should not find a derived cluster for two clusters with intersection that is not sequential', () => {
    const clusterOne = [1, [[0, 1], [0, 2]]];
    const clusterTwo = [1, [[0, 0], [0, 1], [0, 2], [1, 2]]];

    const result = derivedClustersFromClusters([clusterOne, clusterTwo]);
    expect(result).toEqual([]);
  });
});
