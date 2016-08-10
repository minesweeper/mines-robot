import clusterNeighbours from '.';
import expect from 'expect';

describe('clusterNeighbours', () => {
  it('should determine the number of neighbours for a cluster of cells three sequential', () => {
    const cells = [[0, 0], [0, 1], [0, 2]];
    expect(clusterNeighbours(cells)).toEqual([1, 2, 1]);
  });

  it('should determine the number of neighbours for a non-cluster of cells', () => {
    const cells = [[0, 0], [0, 2]];
    expect(clusterNeighbours(cells)).toEqual([0, 0]);
  });

  it('should determine the number of neighbours for a t-shaped cluster of cells', () => {
    const cells = [[0, 0], [0, 1], [0, 2], [1, 1]];
    expect(clusterNeighbours(cells)).toEqual([1, 3, 1, 1]);
  });

  it('should determine the number of neighbours for a single cell', () => {
    const cells = [[1, 1]];
    expect(clusterNeighbours(cells)).toEqual([0]);
  });

  it('should determine the number of neighbours for a cluster of cells three sequential reverse order', () => {
    const cells = [[0, 2], [0, 1], [0, 0]];
    expect(clusterNeighbours(cells)).toEqual([1, 2, 1]);
  });
});
