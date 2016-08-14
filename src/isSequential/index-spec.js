import isSequential from '.';
import expect from 'expect';

describe('isSequential', () => {
  it('should determine that an empty list is not sequential', () => {
    expect(isSequential([])).toBe(false);
  });

  it('should determine that two horizontal cells are sequential', () => {
    const cells = [[0, 0], [0, 1]];
    expect(isSequential(cells)).toBe(true);
  });

  it('should determine that five cross-shaped cells are not sequential', () => {
    const cells = [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]];
    expect(isSequential(cells)).toBe(false);
  });

  it('should determine that four t-shaped cells are not sequential', () => {
    const cells = [[0, 0], [0, 1], [0, 2], [1, 1]];
    expect(isSequential(cells)).toBe(false);
  });

  it('should determine that a single cell is sequential', () => {
    const cells = [[1, 1]];
    expect(isSequential(cells)).toBe(true);
  });

  it('should determine that two separate horizontal cells are not sequential', () => {
    const cells = [[0, 0], [0, 2]];
    expect(isSequential(cells)).toBe(false);
  });

  it('should determine that two separate vertical cells are not sequential', () => {
    const cells = [[1, 1], [3, 1]];
    expect(isSequential(cells)).toBe(false);
  });

  it('should determine that corner shaped cells are sequential', () => {
    const cells = [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]];
    expect(isSequential(cells)).toBe(true);
  });

  it('should determine that donut shaped cells are not sequential', () => {
    const cells = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]];
    expect(isSequential(cells)).toBe(false);
  });

  it('should determine that nine square shaped cells are not sequential', () => {
    const cells = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    expect(isSequential(cells)).toBe(false);
  });

  it('should determine that two separate clusters of two cells are not sequential', () => {
    const cells = [[0, 1], [0, 2], [1, 0], [2, 0]];
    expect(isSequential(cells)).toBe(false);
  });
});
