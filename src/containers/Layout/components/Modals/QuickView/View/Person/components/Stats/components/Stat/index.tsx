import { ReactElement, forwardRef } from 'react';
import CountUp from 'react-countup';

import { useColorMode, useConst, Stat as CUIStat, VStack, StatLabel, StatNumber } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { StatRef, StatProps } from './types';

import SkeletonText from '../../../../../../../../../../../components/Skeleton/Text';

const dummies = range(50, 150, 20);

const Stat = forwardRef<StatRef, StatProps>(function Stat(props, ref): ReactElement {
	const { colorMode } = useColorMode();

	const { label = '', number = 0, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<CUIStat ref={ref} justifyContent='center'>
			<VStack spacing={0}>
				<SkeletonText fontSize='3xl' isLoaded={!isLoading}>
					<StatNumber
						color={`gray.${colorMode === 'light' ? 900 : 50}`}
						fontSize='3xl'
						lineHeight='normal'
						whiteSpace='nowrap'
					>
						{!isLoading ? <CountUp duration={1} end={number || 0} /> : dummy}
					</StatNumber>
				</SkeletonText>
				<StatLabel
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='xs'
					whiteSpace='nowrap'
					textTransform='uppercase'
				>
					{label}
				</StatLabel>
			</VStack>
		</CUIStat>
	);
});

export default Stat;
