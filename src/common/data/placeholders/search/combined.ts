import range from 'lodash/range';
import sample from 'lodash/sample';
import sampleSize from 'lodash/sampleSize';

import collections from './collections';
import companies from './companies';
import movie from './movie';
import people from './people';
import tv from './tv';

const numbers = range(0, 5);

const placeholders = [
	...sampleSize(collections, sample(numbers)),
	...sampleSize(companies, sample(numbers)),
	...sampleSize(movie, sample(numbers)),
	...sampleSize(people, sample(numbers)),
	...sampleSize(tv, sample(numbers))
];

export default placeholders;
