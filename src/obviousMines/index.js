import {times, filter, unionWith, isEqual} from 'lodash';
import {cellStates} from 'mines';
import cellNeighbours from '../cellNeighbours';

export default (game) => {
  const rowCount = game.dimensions[0];
  const colCount = game.dimensions[1];
  let obviousMines = [];

  times(rowCount, (rowIndex) => {
    times(colCount, (colIndex) => {
      const cellState = game.cellState([rowIndex, colIndex]);
      const numbers = 9;
      times(numbers, (index) => {
        if (cellState === cellStates[index]) {
          const neighbours = cellNeighbours(game.dimensions, [rowIndex, colIndex]);
          const unmarkedNeighbours = filter(neighbours, (neighbour) => {
            return game.cellState(neighbour) === cellStates.UNKNOWN;
          });
          if (unmarkedNeighbours.length === index) {
            obviousMines = unionWith(obviousMines, unmarkedNeighbours, isEqual);
          }
        }
      });
    });
  });

  return obviousMines;
};
