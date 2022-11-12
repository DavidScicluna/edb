import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid, { width } from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../common/utils';
import { TVShowVerticalPoster } from '../../../../../../../../../../../../components';

import { AllTabTVShowsProps } from './types';

const limit = 20;

const AllTabTVShows: FC<AllTabTVShowsProps> = ({ type, shows, onSetActiveTab }) => {
	const total = shows.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}
			subtitle={`${type === 'liked' ? 'Liked' : 'Bookmarked'} a total of ${numbro(total).format({
				average: true
			})} ${formatMediaTypeLabel({ type: total === 1 ? 'single' : 'multiple', mediaType: 'tv' })}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'tv'
			})}`}
			isDisabled={total === 0}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'tv' }) : undefined}
		>
			{sort(shows)
				.desc((show) => show.addedAt)
				.filter((_show, index) => index <= limit)
				.map((show) => (
					<TVShowVerticalPoster key={show.mediaItem.id} show={show.mediaItem} sx={{ width }} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabTVShows;
