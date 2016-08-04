import mineProbabilities from '../mineProbabilities';

export default (game) => {
  const orderedCells = mineProbabilities(game);
  return orderedCells[0][0];
};
