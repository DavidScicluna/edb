import { ReactElement } from 'react';

import { Skeleton, Button, Icon } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import { useSelector } from '../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';

import { CertificationProps } from './types';

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
			renderRight={isActive ? (props) => <Icon {...props} icon='check' category='outlined' /> : undefined}
			onClick={onClick ? () => onClick({ certification, meaning, order }) : undefined}
			isDisabled={isLoading}
			variant='outlined'
		>
			<Skeleton width={isLoading ? `${dummy}px` : 'auto'} isLoaded={!isLoading} variant='text'>
				{certification || 'Certification'}
			</Skeleton>
		</Button>
	);
};

export default Certification;
