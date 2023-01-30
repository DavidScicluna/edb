import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { TVShowVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';
import { getMediaTypeIndex } from '../../../../common/utils';
import useSelectorTyped from '../../../../../../../../../common/hooks/useSelectorTyped';

import { AllTabShowsProps } from './types';

const AllTabShows: FC<AllTabShowsProps> = ({ mediaTypes, onSetActiveTab }) => {
	const recentlyViewedPeople = useSelectorTyped((state) => state.users.data.activeUser.data.recentlyViewed.tv);
	const total = recentlyViewedPeople.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}
			subtitle={`This list is showing the most recently viewed ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'tv'
			})}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'tv'
			})}`}
			isDisabled={total === 0}
			onFooterClick={
				total > 0 && onSetActiveTab
					? () => onSetActiveTab({ index: getMediaTypeIndex({ mediaTypes, mediaType: 'tv' }) })
					: undefined
			}
		>
			{sort(recentlyViewedPeople)
				.desc(({ addedAt }) => addedAt)
				.filter((_show, index) => index < 20)
				.map(({ mediaItem }) => (
					<TVShowVerticalPoster key={mediaItem.id} show={mediaItem} sx={dimensions} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabShows;
