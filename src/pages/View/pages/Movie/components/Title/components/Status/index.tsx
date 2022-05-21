import { ReactElement } from 'react';

import { Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useSelector } from '../../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

import { StatusProps } from './types';

const Status = (props: StatusProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { status, fontSize, isLoading = true } = props;

	return (
		<Badge color={color} size={fontSize} variant='outlined'>
			{/* TODO: FIX SkeletonText */}
			<BadgeLabel>{isLoading ? <SkeletonText isLoaded={!isLoading} /> : status || 'Movie Status'}</BadgeLabel>
		</Badge>
	);
};

export default Status;
