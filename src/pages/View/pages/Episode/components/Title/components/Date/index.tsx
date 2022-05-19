import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import sample from 'lodash/sample';


import { handleReturnDate } from '../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

import { DateProps } from './types';

const dummies = range(25, 200, 5);

const Date = (props: DateProps): ReactElement => {
	const { air_date, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{!(isNil(air_date) || isEmpty(air_date)) && !isLoading
					? `Episode Aired on ${handleReturnDate(air_date || '', 'full')}`
					: 'TV Show Episode Date'}
			</Text>
		</SkeletonText>
	);
};

export default Date;
