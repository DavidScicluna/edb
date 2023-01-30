import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { MovieVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';
import { getMediaTypeIndex } from '../../../../common/utils';
import { useSelector } from '../../../../../../../../../common/hooks';

import { AllTabMoviesProps } from './types';

const AllTabMovies: FC<AllTabMoviesProps> = ({ mediaTypes, onSetActiveTab }) => {
	const recentlyViewedMovies = useSelector((state) => state.users.data.activeUser.data.recentlyViewed.movie);
	const total = recentlyViewedMovies.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}
			subtitle={`This list is showing the most recently viewed ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})}`}
			isDisabled={total === 0}
			onFooterClick={
				total > 0 && onSetActiveTab
					? () => onSetActiveTab({ index: getMediaTypeIndex({ mediaTypes, mediaType: 'movie' }) })
					: undefined
			}
		>
			{sort(recentlyViewedMovies)
				.desc(({ addedAt }) => addedAt)
				.filter((_movie, index) => index < 20)
				.map(({ mediaItem }) => (
					<MovieVerticalPoster key={mediaItem.id} movie={mediaItem} sx={dimensions} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabMovies;
