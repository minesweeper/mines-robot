import leftDifference from '.';
import expect from 'expect';

describe('leftDifference', () => {
  it('should compare two arrays of cells and return the left difference', () => {
    const cellsA = [[0, 0], [0, 1]];
    const cellsB = [[0, 1]];
    expect(leftDifference(cellsA, cellsB)).toEqual([[0, 0]]);
  });

  it('should compare two arrays of cells and return nothing when there is no difference', () => {
    const cellsA = [[0, 0], [0, 1]];
    const cellsB = [[0, 1], [0, 0]];
    expect(leftDifference(cellsA, cellsB)).toEqual([]);
  });

  it('should not return the right difference when there is a difference on the right', () => {
    const cellsA = [[0, 1]];
    const cellsB = [[0, 1], [0, 2]];
    expect(leftDifference(cellsA, cellsB)).toEqual([]);
  });
});
