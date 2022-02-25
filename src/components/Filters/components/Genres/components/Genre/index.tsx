import { ReactElement } from 'react';

import { useConst } from '@chakra-ui/react';

import _ from 'lodash';

import { GenreProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../Clickable/Button';
import Icon from '../../../../../Icon';
import SkeletonText from '../../../../../Skeleton/Text';

const dummies = _.range(25, 100, 10);

const Genre = ({ id, name, isActive = false, isLoading = true, onClick }: GenreProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	const dummy = useConst<number>(_.sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			renderRightIcon={
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
