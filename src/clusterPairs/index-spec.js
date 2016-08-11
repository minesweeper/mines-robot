import clusterPairs from '.';
import expect from 'expect';

describe('clusterPairs', () => {
  it('should generate pairs for clusters for comparison for 2 clusters', () => {
    const clusters = [
      [1, [[0, 0], [0, 1], [0, 2]]],
      [2, [[1, 1], [1, 2], [1, 3]]]
    ];
    expect(clusterPairs(clusters)).toEqual([
      [[1, [[0, 0], [0, 1], [0, 2]]], [2, [[1, 1], [1, 2], [1, 3]]]]
    ]);
  });

  it('should generate pairs for clusters for comparison for 3 clusters', () => {
    const clusters = [
      [1, [[0, 0], [0, 1], [0, 2]]],
      [2, [[1, 1], [1, 2]]],
      [3, [[0, 0], [8, 8]]]
    ];
    expect(clusterPairs(clusters)).toEqual([
      [[1, [[0, 0], [0, 1], [0, 2]]], [2, [[1, 1], [1, 2]]]],
      [[1, [[0, 0], [0, 1], [0, 2]]], [3, [[0, 0], [8, 8]]]],
      [[2, [[1, 1], [1, 2]]], [3, [[0, 0], [8, 8]]]]
    ]);
  });

  it('should generate zero pairs for one cluster', () => {
    const clusters = [
      [1, [[0, 0], [0, 1], [0, 2]]]
    ];
    expect(clusterPairs(clusters)).toEqual([
    ]);
  });
});
