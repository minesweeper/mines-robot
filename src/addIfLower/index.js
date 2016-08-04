import {findIndex, isEqual} from 'lodash';

export default (mineProbabilities, cell, probability) => {
  const mineProbality = [cell, probability];
  const index = findIndex(mineProbabilities, (mp) => { return isEqual(mp[0], cell); });
  if (index > -1) {
    if (probability < mineProbabilities[index][1]) {
      mineProbabilities[index] = mineProbality;
    }
  } else {
    mineProbabilities.push(mineProbality);
  }
  return mineProbabilities;
};
