import { sort } from 'fast-sort';
import { memoize, uniqBy } from 'lodash';

import { Credits } from '../../../../../../common/types/person';
import { ViewKnownForCredits } from '../../types';

type GetKnownForProps = { credits: Credits };

export const getKnownFor = memoize(({ credits }: GetKnownForProps): ViewKnownForCredits => {
	const { cast = [], crew = [] } = credits;

	return uniqBy(
		sort([...cast, ...crew]).by([
			{ desc: ({ vote_count }) => vote_count },
			{ desc: ({ vote_average }) => vote_average },
			{ desc: ({ popularity }) => popularity }
		]),
		'id'
	).filter((_mediaItem, index) => index < 20);
});
