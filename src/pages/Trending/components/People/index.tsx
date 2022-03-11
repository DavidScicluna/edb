import { ReactElement } from 'react';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { PeopleProps } from './types';

import { useSelector } from '../../../../common/hooks';
import LoadMore from '../../../../components/Clickable/LoadMore';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import VerticalPeople from '../../../People/components/Orientation/Vertical';

const People = ({ people, query, onLoadMore }: PeopleProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalPeople
				isError={query.isError}
				isSuccess={query.isSuccess}
				isLoading={query.isFetching || query.isLoading}
				people={people?.results || []}
			/>

			<Center style={{ width: isSm ? '100%' : 'auto' }}>
				<LoadMore
					color={color}
					amount={people?.results?.length || 0}
					total={people?.total_results || 0}
					label='Trending People'
					isLoading={query.isFetching || query.isLoading}
					isButtonVisible={query.hasNextPage && !query.isError}
					onClick={() => onLoadMore()}
				/>
			</Center>
		</VStack>
	);
};

export default People;
