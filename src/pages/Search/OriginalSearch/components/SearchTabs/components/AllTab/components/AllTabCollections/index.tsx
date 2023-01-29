import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { CollectionVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';

import { AllTabCollectionsProps } from './types';
import { useSearchContext } from '../../../../../../common/hooks';
import { getMediaTypeIndex } from '../../../../common/utils';

const AllTabCollections: FC<AllTabCollectionsProps> = ({ mediaTypes, collections }) => {
	const { query, onSetActiveTab } = useSearchContext();

	const { total_results: total = 0, results = [] } = collections || {};

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' })}
			subtitle={`Found a total of ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'collection'
			})} with query "${query}"`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'collection'
			})}`}
			isDisabled={total === 0}
			onFooterClick={
				total > 0 && onSetActiveTab
					? () => onSetActiveTab({ index: getMediaTypeIndex({ mediaTypes, mediaType: 'collection' }) })
					: undefined
			}
		>
			{results.map((collection) => (
				<CollectionVerticalPoster key={collection.id} collection={collection} sx={dimensions} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabCollections;
