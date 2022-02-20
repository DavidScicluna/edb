import _ from 'lodash';

import collections from './collections';
import companies from './companies';
import movie from './movie';
import people from './people';
import tv from './tv';

const numbers = _.range(0, 5);

const placeholders = [
	..._.sampleSize(collections, _.sample(numbers)),
	..._.sampleSize(companies, _.sample(numbers)),
	..._.sampleSize(movie, _.sample(numbers)),
	..._.sampleSize(people, _.sample(numbers)),
	..._.sampleSize(tv, _.sample(numbers))
];

export default placeholders;
