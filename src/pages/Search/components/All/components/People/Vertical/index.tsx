import { ReactElement } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import { VerticalSearchPeopleProps } from './types';

import { useSelector } from '../../../../../../../common/hooks';
import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';
import VerticalPeople from '../../../../../../People/components/Orientation/Vertical';

const VerticalSearchPeople = ({ query, people, peopleQuery }: VerticalSearchPeopleProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalPeople
				isError={peopleQuery.isError}
				isSuccess={peopleQuery.isSuccess}
				isLoading={peopleQuery.isFetching || peopleQuery.isLoading}
				people={people?.results || []}
			/>

			<ScaleFade in={!peopleQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
				<LoadMore
					color={color}
					amount={people?.results?.length || 0}
					total={people?.total_results || 0}
					label={`People with "${query}"`}
					isLoading={peopleQuery.isFetching || peopleQuery.isLoading}
					isButtonVisible={(peopleQuery.hasNextPage || true) && !peopleQuery.isError}
					onClick={peopleQuery.fetchNextPage}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default VerticalSearchPeople;
