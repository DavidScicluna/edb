import { ReactElement } from 'react';

import { useConst } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import { CertificationProps } from './types';

import { useSelector } from '../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';
import Button from '../../../../../../Clickable/Button';
import Icon from '../../../../../../Icon';
import SkeletonText from '../../../../../../Skeleton/Text';

const dummies = range(25, 200, 5);

const Certification = (props: CertificationProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { certification, meaning, order, isActive = false, isLoading = true, onClick } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			renderRight={
				isActive ? ({ fontSize }) => <Icon icon='check' type='outlined' fontSize={fontSize} /> : undefined
			}
			onClick={onClick ? () => onClick({ certification, meaning, order }) : undefined}
			isDisabled={isLoading}
			variant='outlined'
		>
			<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='sm' isLoaded={!isLoading}>
				{certification || 'Certification'}
			</SkeletonText>
		</Button>
	);
};

export default Certification;
