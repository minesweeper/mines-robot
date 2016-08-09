import {isEqual, unionWith} from 'lodash';
import leftDifference from '../leftDifference';

export default (a, b) => unionWith(leftDifference(a, b), leftDifference(b, a), isEqual);
