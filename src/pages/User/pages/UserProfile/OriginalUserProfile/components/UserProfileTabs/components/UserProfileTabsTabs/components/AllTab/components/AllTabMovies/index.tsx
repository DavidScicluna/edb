import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../../common/utils';
import { MovieVerticalPoster } from '../../../../../../../../../../../../../components';
import dimensions from '../../../../../../../../../../../../../components/Posters/common/data/dimensions';

import { AllTabMoviesProps } from './types';

const limit = 20;

const AllTabMovies: FC<AllTabMoviesProps> = ({ type, movies, onSetActiveTab }) => {
	const total = movies.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}
			subtitle={`${type === 'liked' ? 'Liked' : 'Bookmarked'} a total of ${numbro(total).format({
				average: true
			})} ${formatMediaTypeLabel({ type: total === 1 ? 'single' : 'multiple', mediaType: 'movie' })}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})}`}
			isDisabled={total === 0}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'movie' }) : undefined}
		>
			{sort(movies)
				.desc(({ addedAt }) => addedAt)
				.filter((_movie, index) => index <= limit)
				.map(({ mediaItem }) => (
					<MovieVerticalPoster key={mediaItem.id} movie={mediaItem} sx={dimensions} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabMovies;
