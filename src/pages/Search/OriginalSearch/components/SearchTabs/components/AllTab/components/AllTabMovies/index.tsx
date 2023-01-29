import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { MovieVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';

import { AllTabMoviesProps } from './types';
import { useSearchContext } from '../../../../../../common/hooks';
import { getMediaTypeIndex } from '../../../../common/utils';

const AllTabMovies: FC<AllTabMoviesProps> = ({ mediaTypes, movies }) => {
	const { query, onSetActiveTab } = useSearchContext();

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
			})}`}
			isDisabled={total === 0}
			onFooterClick={
				total > 0 && onSetActiveTab
					? () => onSetActiveTab({ index: getMediaTypeIndex({ mediaTypes, mediaType: 'movie' }) })
					: undefined
			}
		>
			{results.map((movie) => (
				<MovieVerticalPoster key={movie.id} movie={movie} sx={dimensions} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabMovies;
