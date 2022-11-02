import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid, { width } from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../../../common/utils';
import { MovieVerticalPoster } from '../../../../../../../../../../../../../../components';
import { useSelector } from '../../../../../../../../../../../../../../common/hooks';

import { AllTabMoviesProps } from './types';

const limit = 20;

const AllTabMovies: FC<AllTabMoviesProps> = ({ onSetActiveTab }) => {
	const movies = useSelector((state) => state.users.data.activeUser.data.liked.movie);
	const total = movies.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}
			subtitle={`Liked a total of ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})}`}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'movie' }) : undefined}
		>
			{sort(movies)
				.desc((movie) => movie.addedAt)
				.filter((_movie, index) => index <= limit)
				.map((movie) => (
					<MovieVerticalPoster key={movie.mediaItem.id} movie={movie.mediaItem} sx={{ width }} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabMovies;
