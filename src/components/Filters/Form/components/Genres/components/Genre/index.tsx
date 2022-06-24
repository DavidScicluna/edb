import { ReactElement } from 'react';

import { Skeleton, Button, Icon } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { useSelector } from '../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';

import { GenreProps } from './types';

const dummies = range(25, 200, 5);

const Genre = ({ id, name, isActive = false, isLoading = true, onClick }: GenreProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			renderRight={isActive ? (props) => <Icon {...props} icon='check' category='outlined' /> : undefined}
			onClick={onClick ? () => onClick({ id, name }) : undefined}
			isDisabled={isLoading}
			variant='outlined'
		>
			<Skeleton width={isLoading ? `${dummy}px` : 'auto'} isLoaded={!isLoading} type='text'>
				{name || 'Genre'}
			</Skeleton>
		</Button>
	);
};

export default Genre;
