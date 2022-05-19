import { ReactElement } from 'react';


import { useSelector } from '../../../../../../../../common/hooks';
import Badge from '../../../../../../../../components/Badge';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

import { StatusProps } from './types';

const Status = (props: StatusProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { status, fontSize, isLoading = true } = props;

	return (
		<Badge color={color} size={fontSize} isLoading={isLoading} variant='outlined'>
			{status || 'Movie Status'}
		</Badge>
	);
};

export default Status;
