import areNeighbours from '.';
import expect from 'expect';

describe('areNeighbours', () => {
  it('should determine that two horizontal neighbours are indeed neighbours', () => {
    const neighbour1 = [0, 0];
    const neighbour2 = [0, 1];
    expect(areNeighbours(neighbour1, neighbour2)).toBe(true);
  });

  it('should determine that two horizontal neighbours are indeed neighbours when the first neighbour is on the right', () => {
    const neighbour1 = [0, 1];
    const neighbour2 = [0, 0];
    expect(areNeighbours(neighbour1, neighbour2)).toBe(true);
  });

  it('should determine that two vertical neighbours are indeed neighbours', () => {
    const neighbour1 = [3, 1];
    const neighbour2 = [4, 1];
    expect(areNeighbours(neighbour1, neighbour2)).toBe(true);
  });

  it('should determine that two vertical neighbours are indeed neighbours when the first neighbour is above the other', () => {
    const neighbour1 = [5, 0];
    const neighbour2 = [4, 0];
    expect(areNeighbours(neighbour1, neighbour2)).toBe(true);
  });

  it('should determine that two of the same cells are not neighbours to oneself with column and row both the same', () => {
    const neighbour1 = [0, 0];
    const neighbour2 = [0, 0];
    expect(areNeighbours(neighbour1, neighbour2)).toBe(false);
  });

  it('should determine that two of the same cells are not neighbours to oneself with same row', () => {
    const neighbour1 = [3, 6];
    const neighbour2 = [3, 6];
    expect(areNeighbours(neighbour1, neighbour2)).toBe(false);
  });

});
