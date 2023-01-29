import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../../common/utils';
import { PersonVerticalPoster } from '../../../../../../../../../../../../../components';
import dimensions from '../../../../../../../../../../../../../components/Posters/common/data/dimensions';

import { AllTabPeopleProps } from './types';

const limit = 20;

const AllTabPeople: FC<AllTabPeopleProps> = ({ type, people, onSetActiveTab }) => {
	const total = people.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}
			subtitle={`${type === 'liked' ? 'Liked' : 'Bookmarked'} a total of ${numbro(total).format({
				average: true
			})} ${formatMediaTypeLabel({ type: total === 1 ? 'single' : 'multiple', mediaType: 'person' })}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'person'
			})}`}
			isDisabled={total === 0}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'person' }) : undefined}
		>
			{sort(people)
				.desc((person) => person.addedAt)
				.filter((_person, index) => index <= limit)
				.map((person) => (
					<PersonVerticalPoster key={person.mediaItem.id} person={person.mediaItem} sx={dimensions} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabPeople;
