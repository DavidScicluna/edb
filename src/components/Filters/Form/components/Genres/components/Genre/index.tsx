import { ReactElement } from 'react';

import { useConst } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { GenreProps } from './types';

import { useSelector } from '../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';
import Button from '../../../../../../Clickable/Button';
import Icon from '../../../../../../Icon';
import SkeletonText from '../../../../../../Skeleton/Text';

const dummies = range(25, 200, 5);

const Genre = ({ id, name, isActive = false, isLoading = true, onClick }: GenreProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			renderRight={
				isActive ? ({ fontSize }) => <Icon icon='check' type='outlined' fontSize={fontSize} /> : undefined
			}
			onClick={onClick ? () => onClick({ id, name }) : undefined}
			isDisabled={isLoading}
			variant='outlined'
		>
			<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='sm' isLoaded={!isLoading}>
				{name || 'Genre'}
			</SkeletonText>
		</Button>
	);
};

export default Genre;
