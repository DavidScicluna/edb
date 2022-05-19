import { ReactElement } from 'react';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';


import { useSelector } from '../../../../common/hooks';
import LoadMore from '../../../../components/Clickable/LoadMore';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import VerticalTV from '../../../TV/components/Orientation/Vertical';

import { TVProps } from './types';

const TV = ({ shows, query, onLoadMore }: TVProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalTV
				isError={query.isError}
				isSuccess={query.isSuccess}
				isLoading={query.isFetching || query.isLoading}
				shows={shows?.results || []}
			/>

			<Center style={{ width: isSm ? '100%' : 'auto' }}>
				<LoadMore
					color={color}
					amount={shows?.results?.length || 0}
					total={shows?.total_results || 0}
					label='Trending TV Shows'
					isLoading={query.isFetching || query.isLoading}
					isButtonVisible={query.hasNextPage && !query.isError}
					onClick={() => onLoadMore()}
				/>
			</Center>
		</VStack>
	);
};

export default TV;
