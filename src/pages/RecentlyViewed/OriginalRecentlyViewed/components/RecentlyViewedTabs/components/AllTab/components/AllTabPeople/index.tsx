import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { PersonVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';
import { getMediaTypeIndex } from '../../../../common/utils';
import { useSelector } from '../../../../../../../../../common/hooks';

import { AllTabPeopleProps } from './types';

const AllTabPeople: FC<AllTabPeopleProps> = ({ mediaTypes, onSetActiveTab }) => {
	const recentlyViewedPeople = useSelector((state) => state.users.data.activeUser.data.recentlyViewed.person);
	const total = recentlyViewedPeople.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}
			subtitle={`This list is showing the most recently viewed ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'person'
			})}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'person'
			})}`}
			isDisabled={total === 0}
			onFooterClick={
				total > 0 && onSetActiveTab
					? () => onSetActiveTab({ index: getMediaTypeIndex({ mediaTypes, mediaType: 'person' }) })
					: undefined
			}
		>
			{sort(recentlyViewedPeople)
				.desc(({ addedAt }) => addedAt)
				.filter((_person, index) => index < 20)
				.map(({ mediaItem }) => (
					<PersonVerticalPoster key={mediaItem.id} person={mediaItem} sx={dimensions} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabPeople;
