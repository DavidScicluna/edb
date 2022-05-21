import { ReactElement } from 'react';

import { Badge, BadgeLabel } from '@davidscicluna/component-library';

import compact from 'lodash/compact';

import { useSelector } from '../../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

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
					<SkeletonText isLoaded={!isLoading} />
				) : (
					compact([name, season ? `S${season}` : undefined, episode ? `E${episode}` : undefined]).join(' • ')
				)}
			</BadgeLabel>
		</Badge>
	);
};

export default Show;
