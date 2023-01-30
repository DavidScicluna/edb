import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { CollectionVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';
import { getMediaTypeIndex } from '../../../../common/utils';
import { useSelector } from '../../../../../../../../../common/hooks';

import { AllTabCollectionsProps } from './types';

const AllTabCollections: FC<AllTabCollectionsProps> = ({ mediaTypes, onSetActiveTab }) => {
	const recentlyViewedCollections = useSelector(
		(state) => state.users.data.activeUser.data.recentlyViewed.collection
	);
	const total = recentlyViewedCollections.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' })}
			subtitle={`This list is showing the most recently viewed ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'collection'
			})}`}
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
			{sort(recentlyViewedCollections)
				.desc(({ addedAt }) => addedAt)
				.filter((_collection, index) => index < 20)
				.map(({ mediaItem }) => (
					<CollectionVerticalPoster key={mediaItem.id} collection={mediaItem} sx={dimensions} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabCollections;
