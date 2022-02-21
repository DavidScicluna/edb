import { ReactElement } from 'react';

import { useColorMode, useConst, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { RevenueProps } from './types';

import { handleFormatMoney } from '../../../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

const dummies = _.range(25, 100, 20);

const Revenue = ({ revenue, isLoading = true }: RevenueProps): ReactElement => {
	const { colorMode } = useColorMode();

	const dummy = useConst<number>(_.sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
			<Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' whiteSpace='nowrap'>
				{revenue ? `$${handleFormatMoney(revenue)}` : 'Movie Revenue'}
			</Text>
		</SkeletonText>
	);
};

export default Revenue;