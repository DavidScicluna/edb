import { ReactElement } from 'react';

import { useColorMode, useConst, Box, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import SkeletonText from '../../../../Skeleton/Text';

import { TitleProps } from './types';

const dummies = range(25, 100, 5);

const Title = (props: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { title, isLoading = false, inView = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height='19.25px' // Size of typography height
		>
			{inView ? (
				<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='sm' isLoaded={!isLoading}>
					<Text
						align='left'
						fontSize='sm'
						fontWeight='semibold'
						color={`gray.${colorMode === 'light' ? 900 : 50}`}
						noOfLines={1}
					>
						{title || 'Poster Title'}
					</Text>
				</SkeletonText>
			) : null}
		</Box>
	);
};

export default Title;
