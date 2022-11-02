import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid, { width } from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../../../../common/utils';
import { PersonVerticalPoster } from '../../../../../../../../../../../../../../../components';
import { useSelector } from '../../../../../../../../../../../../../../../common/hooks';

import { AllTabPeopleProps } from './types';

const limit = 20;

const AllTabPeople: FC<AllTabPeopleProps> = ({ onSetActiveTab }) => {
	const people = useSelector((state) => state.users.data.activeUser.data.liked.person);
	const total = people.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}
			subtitle={`Liked a total of ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'person'
			})}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'person'
			})}`}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'person' }) : undefined}
		>
			{sort(people)
				.desc((person) => person.addedAt)
				.filter((_person, index) => index <= limit)
				.map((person) => (
					<PersonVerticalPoster key={person.mediaItem.id} person={person.mediaItem} sx={{ width }} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabPeople;
