import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid, { width } from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import PersonVerticalPoster from '../../../../../../../../People/components/Posters/PersonVerticalPoster';

import { AllTabPeopleProps } from './types';

const AllTabPeople: FC<AllTabPeopleProps> = ({ query, people, onSetActiveTab }) => {
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
			})} in Tab`}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'person' }) : undefined}
		>
			{results.map((person) => (
				<PersonVerticalPoster key={person.id} person={person} sx={{ width }} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabPeople;
