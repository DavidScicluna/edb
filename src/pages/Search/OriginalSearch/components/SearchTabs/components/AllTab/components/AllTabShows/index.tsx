import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { TVShowVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';
import { useSearchContext } from '../../../../../../common/hooks';
import { getMediaTypeIndex } from '../../../../common/utils';

import { AllTabShowsProps } from './types';

const AllTabShows: FC<AllTabShowsProps> = ({ mediaTypes, shows }) => {
	const { query, onSetActiveTab } = useSearchContext();

	const { results = [], total_results: total = 0 } = shows || {};

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
			})}`}
			isDisabled={total === 0}
			onFooterClick={
				total > 0 && onSetActiveTab
					? () => onSetActiveTab({ index: getMediaTypeIndex({ mediaTypes, mediaType: 'tv' }) })
					: undefined
			}
		>
			{results.map((show) => (
				<TVShowVerticalPoster key={show.id} show={show} sx={dimensions} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabShows;
