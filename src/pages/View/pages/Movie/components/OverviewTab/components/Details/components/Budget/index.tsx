import { ReactElement } from 'react';

import { useColorMode, useConst, Text } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { BudgetProps } from './types';

import { handleFormatMoney } from '../../../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 100, 20);

const Budget = ({ budget, isLoading = true }: BudgetProps): ReactElement => {
	const { colorMode } = useColorMode();

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
			<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' whiteSpace='nowrap'>
				{budget ? `$${handleFormatMoney(budget)}` : 'Movie Budget'}
			</Text>
		</SkeletonText>
	);
};

export default Budget;
