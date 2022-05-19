import { ReactElement } from 'react';

import { useColorMode, useBreakpointValue, useConst, Box, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';


import { FontSizes } from '../../../../../theme/types';
import SkeletonText from '../../../../Skeleton/Text';

import { TitleProps } from './types';

const dummies = range(25, 100, 5);
const height = ['19.25px', '22px', '24.75px', '27.5px', '33px', '41.25px'];

const Title = (props: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const fontSize = useBreakpointValue<keyof FontSizes>({
		'base': 'sm',
		'sm': 'md',
		'md': 'lg',
		'lg': 'xl',
		'xl': '2xl',
		'2xl': '3xl'
	});

	const { title, isLoading = false, inView = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={height} // Size of typography height
		>
			{inView ? (
				<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
					<Text
						align='left'
						fontSize={fontSize}
						fontWeight='semibold'
						color={`gray.${colorMode === 'light' ? 900 : 50}`}
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
					>
						{title || 'Poster Title'}
					</Text>
				</SkeletonText>
			) : null}
		</Box>
	);
};

export default Title;
