import { ReactElement } from 'react';

import { useColorMode, useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';


import { handleFormatMoney } from '../../../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

import { RevenueProps } from './types';

const dummies = range(25, 200, 5);

const Revenue = ({ revenue, isLoading = true }: RevenueProps): ReactElement => {
	const { colorMode } = useColorMode();

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
			<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' whiteSpace='nowrap'>
				{revenue ? `$${handleFormatMoney(revenue)}` : 'Movie Revenue'}
			</Text>
		</SkeletonText>
	);
};

export default Revenue;
