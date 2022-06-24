import { ReactElement } from 'react';

import { FontSize, Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useBreakpointValue, useConst, Box, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { SubtitleProps } from './types';

const dummies = range(25, 100, 5);
const height = ['16.5px', '19.25px', '22px', '24.75px', '27.5px', '33px'];

const Subtitle = (props: SubtitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const fontSize = useBreakpointValue<FontSize>({
		'base': 'xs',
		'sm': 'sm',
		'md': 'md',
		'lg': 'lg',
		'xl': 'xl',
		'2xl': '2xl'
	});

	const { subtitle, isLoading = false, inView = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={height} // Size of typography height
		>
			{inView ? (
				<Skeleton width={isLoading ? `${dummy}%` : 'auto'} isLoaded={!isLoading} type='text'>
					<Text
						align='left'
						fontSize={fontSize}
						fontWeight='normal'
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
						noOfLines={1}
					>
						{subtitle || 'Poster Subtitle'}
					</Text>
				</Skeleton>
			) : null}
		</Box>
	);
};

export default Subtitle;
