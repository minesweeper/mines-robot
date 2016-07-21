import {times, filter, unionWith, isEqual} from 'lodash';
import {cellStates} from 'mines';
import cellNeighbours from '../cellNeighbours';
import eachCell from '../eachCell';

export default (game) => {
  let obviousMines = [];

  eachCell(game, (cell, cellState) => {
    const numbers = 9;
    times(numbers, (index) => {
      if (cellState === cellStates[index]) {
        const neighbours = cellNeighbours(game.dimensions, cell);
        const unmarkedNeighbours = filter(neighbours, (neighbour) => {
          return game.cellState(neighbour) === cellStates.UNKNOWN;
        });
        const markedNeighbours = filter(neighbours, (neighbour) => {
          return game.cellState(neighbour) === cellStates.MARKED;
        });
        if (unmarkedNeighbours.length + markedNeighbours.length <= index) {
          obviousMines = unionWith(obviousMines, unmarkedNeighbours, isEqual);
        }
      }
    });
  });

  return obviousMines;
};
