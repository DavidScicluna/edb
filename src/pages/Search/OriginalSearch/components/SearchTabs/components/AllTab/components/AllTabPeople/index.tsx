import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { PersonVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';

import { AllTabPeopleProps } from './types';
import { getMediaTypeIndex } from '../../../../common/utils';
import { useSearchContext } from '../../../../../../common/hooks';

const AllTabPeople: FC<AllTabPeopleProps> = ({ mediaTypes, people }) => {
	const { query, onSetActiveTab } = useSearchContext();

	const { total_results: total = 0, results = [] } = people || {};

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}
			subtitle={`Found a total of ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'person'
			})} with query "${query}"`}
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
			{results.map((person) => (
				<PersonVerticalPoster key={person.id} person={person} sx={dimensions} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabPeople;
