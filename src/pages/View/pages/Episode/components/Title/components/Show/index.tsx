import { ReactElement } from 'react';

import { Badge, BadgeLabel, Skeleton } from '@davidscicluna/component-library';

import compact from 'lodash/compact';

import { useSelector } from '../../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

import { ShowProps } from './types';

const Show = (props: ShowProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { name, season, episode, fontSize, isLoading = true } = props;

	return (
		<Badge color={color} size={fontSize} variant='outlined'>
			<BadgeLabel>
				{isLoading ? (
					// TODO: FIX SkeletonText
					<Skeleton isLoaded={!isLoading} type='text' />
				) : (
					compact([name, season ? `S${season}` : undefined, episode ? `E${episode}` : undefined]).join(' • ')
				)}
			</BadgeLabel>
		</Badge>
	);
};

export default Show;
