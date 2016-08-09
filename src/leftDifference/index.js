import {isEqual, filter, some} from 'lodash';

export default (a, b) => filter(a, (a_item) => !some(b, (b_item) => isEqual(a_item, b_item)));
