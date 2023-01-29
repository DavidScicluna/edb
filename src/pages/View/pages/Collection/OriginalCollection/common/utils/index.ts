import { sort } from 'fast-sort';
import { memoize } from 'lodash';

import { Collection, FullMovie } from '../../../../../../../common/types/movie';

type GetCollectionFirstLastPartsProps = Pick<Collection, 'parts'>;
type GetCollectionFirstLastPartsReturn = { first?: FullMovie; last?: FullMovie };

export const getCollectionFirstLastParts = memoize(
	({ parts = [] }: GetCollectionFirstLastPartsProps): GetCollectionFirstLastPartsReturn => {
		const sortedParts = sort([...parts]).asc(({ release_date }) => release_date);

		const lastIndex = sortedParts.length - 1;

		const firstPart = sortedParts && sortedParts[0] ? sortedParts[0] : undefined;
		const lastPart = sortedParts && sortedParts[lastIndex] ? sortedParts[lastIndex] : undefined;

		return { first: firstPart, last: lastPart };
	}
);
