import fullDifference from '.';
import expect from 'expect';

describe('fullDifference', () => {
  it('should compare two arrays of cells and return the full difference', () => {
    const cellsA = [[0, 0], [0, 1]];
    const cellsB = [[0, 1], [0, 2]];
    expect(fullDifference(cellsA, cellsB)).toEqual([[0, 0], [0, 2]]);
  });

  it('should compare two arrays of cells and return nothing when there is no difference', () => {
    const cellsA = [[0, 0], [0, 1]];
    const cellsB = [[0, 1], [0, 0]];
    expect(fullDifference(cellsA, cellsB)).toEqual([]);
  });

  it('should return the right difference when there is just difference on the right', () => {
    const cellsA = [[0, 1]];
    const cellsB = [[0, 1], [0, 2]];
    expect(fullDifference(cellsA, cellsB)).toEqual([[0, 2]]);
  });

  it('should return the left difference when there is just difference on the left', () => {
    const cellsA = [[0, 1], [0, 0]];
    const cellsB = [[0, 1]];
    expect(fullDifference(cellsA, cellsB)).toEqual([[0, 0]]);
  });
});
