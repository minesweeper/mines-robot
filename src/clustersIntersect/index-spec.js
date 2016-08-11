import clustersIntersect from '.';
import expect from 'expect';

describe('clustersIntersect', () => {
  it('should determine two clusters intersect when they do', () => {
    const cellsGroupA = [[0, 0], [0, 1], [0, 2]];
    const cellsGroupB = [[2, 6], [0, 0]];
    expect(clustersIntersect(cellsGroupA, cellsGroupB)).toBe(true);
  });

  it('should determine two clusters intersect when they don\'t', () => {
    const cellsGroupA = [[0, 0], [0, 1], [0, 2]];
    const cellsGroupB = [[2, 6], [9, 9]];
    expect(clustersIntersect(cellsGroupA, cellsGroupB)).toBe(false);
  });

  it('should determine two clusters intersect when they are the same', () => {
    const cellsGroupA = [[6, 6], [0, 0]];
    const cellsGroupB = [[0, 0], [6, 6]];
    expect(clustersIntersect(cellsGroupA, cellsGroupB)).toBe(true);
  });
});
