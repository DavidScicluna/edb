import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid, { width } from '../AllTabHorizontalGrid';
import MovieVerticalPoster from '../../../../../../../../Movies/components/Posters/MovieVerticalPoster';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';

import { AllTabMoviesProps } from './types';

const AllTabMovies: FC<AllTabMoviesProps> = ({ query, movies, onSetActiveTab }) => {
	const { total_results: total = 0, results = [] } = movies || {};

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}
			subtitle={`Found a total of ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})} with query "${query}"`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})} in Tab`}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'movie' }) : undefined}
		>
			{results.map((movie) => (
				<MovieVerticalPoster key={movie.id} movie={movie} sx={{ width }} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabMovies;