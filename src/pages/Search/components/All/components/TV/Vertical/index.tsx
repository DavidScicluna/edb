import { ReactElement } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';


import { useSelector } from '../../../../../../../common/hooks';
import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';
import VerticalTV from '../../../../../../TV/components/Orientation/Vertical';

import { VerticalSearchTVProps } from './types';

const VerticalSearchTV = ({ query, shows, showsQuery }: VerticalSearchTVProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalTV
				isError={showsQuery.isError}
				isSuccess={showsQuery.isSuccess}
				isLoading={showsQuery.isFetching || showsQuery.isLoading}
				shows={shows?.results || []}
			/>

			<ScaleFade in={!showsQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
				<LoadMore
					color={color}
					amount={shows?.results?.length || 0}
					total={shows?.total_results || 0}
					label={`TV Shows with "${query}"`}
					isLoading={showsQuery.isFetching || showsQuery.isLoading}
					isButtonVisible={(showsQuery.hasNextPage || true) && !showsQuery.isError}
					onClick={showsQuery.fetchNextPage}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default VerticalSearchTV;
