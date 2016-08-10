import numberNeighbours from '.';
import expect from 'expect';

describe('numberNeighbours', () => {
  it('should determine that a cell has a horizontal neighbour in a group of cells', () => {
    const cell = [0, 0];
    const otherCells = [[0, 1], [0, 2], [1, 5]];
    expect(numberNeighbours(cell, otherCells)).toBe(1);
  });

  it('should determine that a cell has a vertical neighbour in a group of cells', () => {
    const cell = [1, 1];
    const otherCells = [[6, 6], [7, 8], [2, 1]];
    expect(numberNeighbours(cell, otherCells)).toBe(1);
  });

  it('should determine that a cell has a neighbour when it has three neighbours in a group of cells', () => {
    const cell = [1, 1];
    const otherCells = [[1, 0], [0, 1], [2, 1]];
    expect(numberNeighbours(cell, otherCells)).toBe(3);
  });

  it('should determine that a cell has a neighbour when it has two neighbours in a group of cells', () => {
    const cell = [1, 1];
    const otherCells = [[1, 0], [0, 1], [5, 5]];
    expect(numberNeighbours(cell, otherCells)).toBe(2);
  });

  it('should determine that a cell has no neighbours in a group of cells', () => {
    const cell = [1, 1];
    const otherCells = [[6, 6], [7, 8], [10, 2]];
    expect(numberNeighbours(cell, otherCells)).toBe(0);
  });

});
