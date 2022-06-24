import { ReactElement } from 'react';

import { Badge, BadgeLabel, Skeleton } from '@davidscicluna/component-library';

import { useSelector } from '../../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

import { StatusProps } from './types';

const Status = (props: StatusProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { status, fontSize, isLoading = true } = props;

	return (
		<Badge color={color} size={fontSize} variant='outlined'>
			{}
			<BadgeLabel>
				{/* TODO: FIX Skeleton */}
				{isLoading ? <Skeleton isLoaded={!isLoading} type='text' /> : status || 'TV Show Status'}
			</BadgeLabel>
		</Badge>
	);
};

export default Status;
