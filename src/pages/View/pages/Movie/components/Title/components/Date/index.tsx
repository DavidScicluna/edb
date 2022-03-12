import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { DateProps } from './types';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 200, 5);

const Date = (props: DateProps): ReactElement => {
	const { date, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{dayjs(date).format('DD MMMM YYYY') || 'Movie Date'}
			</Text>
		</SkeletonText>
	);
};

export default Date;
