import { ReactElement } from 'react';

import { useConst } from '@chakra-ui/react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import _ from 'lodash';

import { CertificationProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../Clickable/Button';
import SkeletonText from '../../../../../Skeleton/Text';

const dummies = _.range(25, 100, 10);

const Certification = (props: CertificationProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	const { certification, meaning, order, isActive = false, isLoading = true, onClick } = props;

	const dummy = useConst<number>(_.sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			renderRightIcon={isActive ? ({ fontSize }) => <CheckOutlinedIcon style={{ fontSize }} /> : undefined}
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
