import { Location } from 'react-router';

import { Undefinable } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { formatMediaType } from '../../../../common/utils';

type GetActiveTabFromHashProps = { location: Location };

type GetActiveTabFromHashReturn = Undefinable<0 | 1 | 2>;

export const getActiveTabFromHash = memoize(({ location }: GetActiveTabFromHashProps): GetActiveTabFromHashReturn => {
	const hash = location.hash.replaceAll('#', '');

	switch (hash) {
		case formatMediaType({ mediaType: 'movie' }):
			return 0;
		case formatMediaType({ mediaType: 'tv' }):
			return 1;
		case formatMediaType({ mediaType: 'person' }):
			return 2;
	}
});
