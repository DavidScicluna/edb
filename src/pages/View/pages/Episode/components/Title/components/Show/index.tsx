import { ReactElement } from 'react';

import { compact } from 'lodash';

import { ShowProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import Badge from '../../../../../../../../components/Badge';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

const Show = (props: ShowProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { name, season, episode, fontSize, isLoading = true } = props;

	return (
		<Badge color={color} size={fontSize} isLoading={isLoading} variant='outlined'>
			{compact([name, season ? `S${season}` : undefined, episode ? `E${episode}` : undefined]).join(' • ')}
		</Badge>
	);
};

export default Show;
