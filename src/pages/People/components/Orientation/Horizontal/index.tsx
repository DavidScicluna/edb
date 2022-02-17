import { ReactElement } from 'react';

import _ from 'lodash';

import { HorizontalPeopleProps } from './types';

import { PartialPerson } from '../../../../../common/types/person';
import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import VerticalPersonPoster from '../../Poster/Vertical';

const HorizontalPeople = (props: HorizontalPeopleProps): ReactElement => {
	const { isError = false, isSuccess = false, isLoading = true, people } = props;

	return !isLoading && isError ? (
		<Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='transparent' />
	) : !isLoading && isSuccess && people && people.length === 0 ? (
		<Empty label='People list is currently empty!' variant='transparent' />
	) : !isLoading && isSuccess && people && people.length > 0 ? (
		<>
			{people.map((person: PartialPerson) => (
				<VerticalPersonPoster
					key={person.id}
					width={['185px', '205px', '230px']}
					person={person}
					isLoading={false}
				/>
			))}
		</>
	) : (
		<>
			{_.range(0, 20).map((_dummy, index: number) => (
				<VerticalPersonPoster key={index} width={['185px', '205px', '230px']} isLoading />
			))}
		</>
	);
};

export default HorizontalPeople;
