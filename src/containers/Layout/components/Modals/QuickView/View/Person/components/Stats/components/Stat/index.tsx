import { ReactElement, forwardRef } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useConst, Stat as CUIStat, VStack, StatLabel, StatNumber } from '@chakra-ui/react';

import CountUp from 'react-countup';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { StatRef, StatProps } from './types';

const dummies = range(50, 150, 20);

const Stat = forwardRef<StatRef, StatProps>(function Stat(props, ref): ReactElement {
	const { colorMode } = useColorMode();

	const { label = '', number = 0, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<CUIStat ref={ref} justifyContent='center'>
			<VStack spacing={0}>
				<Skeleton isLoaded={!isLoading} variant='text'>
					<StatNumber
						color={`gray.${colorMode === 'light' ? 900 : 50}`}
						fontSize='3xl'
						lineHeight='normal'
						whiteSpace='nowrap'
					>
						{!isLoading ? <CountUp duration={1} end={number || 0} /> : dummy}
					</StatNumber>
				</Skeleton>
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
