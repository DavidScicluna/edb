import { ReactElement } from 'react';

import { useColorMode, useBreakpointValue, useConst, Box, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { NameProps } from './types';

import SkeletonText from '../../../../../../../../../../../../../../components/Skeleton/Text';
import { FontSizes } from '../../../../../../../../../../../../../../theme/types';

const dummies = _.range(25, 100, 10);
const height = ['19.25px', '22px', '24.75px', '27.5px', '33px', '41.25px'];

const Name = (props: NameProps): ReactElement => {
	const { colorMode } = useColorMode();
	const fontSize = useBreakpointValue<keyof FontSizes>({
		'base': 'sm',
		'sm': 'md',
		'md': 'lg',
		'lg': 'xl',
		'xl': '2xl',
		'2xl': '3xl'
	});

	const { name, isLoading = false, inView = true } = props;

	const dummy = useConst<number>(_.sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={height} // Size of typography height
		>
			{inView || isLoading ? (
				<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
					<Text
						align='left'
						fontSize={fontSize}
						fontWeight='semibold'
						color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
					>
						{name || 'Episode Name'}
					</Text>
				</SkeletonText>
			) : null}
		</Box>
	);
};

export default Name;
