import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid, { width } from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import TVShowVerticalPoster from '../../../../../../../../TV/components/Posters/TVShowVerticalPoster';

import { AllTabShowsProps } from './types';

const AllTabShows: FC<AllTabShowsProps> = ({ query, shows, onSetActiveTab }) => {
	const { total_results: total = 0, results = [] } = shows || {};

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}
			subtitle={`Found a total of ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'tv'
			})} with query "${query}"`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'tv'
			})} in Tab`}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'tv' }) : undefined}
		>
			{results.map((show) => (
				<TVShowVerticalPoster key={show.id} show={show} sx={{ width }} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabShows;
