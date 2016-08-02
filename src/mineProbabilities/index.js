import {cellStates} from 'mines';
import eachRevealedCell from '../eachRevealedCell';
import neighboursWithState from '../neighboursWithState';
import {each, reverse, findIndex, isEqual} from 'lodash';

export default (game) => {
  const mineProbabilities = [];

  eachRevealedCell(game, (cell, count) => {
    const unmarkedNeighbours = neighboursWithState(game, cell, cellStates.UNKNOWN);
    const markedNeighbours = neighboursWithState(game, cell, cellStates.MARKED);
    const numberUnmarkedNeighbours = unmarkedNeighbours.length;
    const numberMarkedNeighbours = markedNeighbours.length;

    if (numberUnmarkedNeighbours > 0 && count > 0) {
      each(reverse(unmarkedNeighbours), (neighbour) => {
        const probability = (count - numberMarkedNeighbours) / numberUnmarkedNeighbours;
        if (mineProbabilities.length > 0) {
            const index = findIndex(mineProbabilities, (mp) => { return isEqual(mp[0], neighbour); });
            if (index > -1) {
              if (probability < mineProbabilities[index][1]) {
                mineProbabilities[index] = [neighbour, probability];
              }
            } else {
              const firstCellsProbability = mineProbabilities[0][1];
              if (probability <= firstCellsProbability) {
                mineProbabilities.unshift([neighbour, probability]);
              } else {
                mineProbabilities.push([neighbour, probability]);
              }
            }
        } else {
          mineProbabilities.push([neighbour, probability]);
        }
      });
    }
  });

  return mineProbabilities;
};
