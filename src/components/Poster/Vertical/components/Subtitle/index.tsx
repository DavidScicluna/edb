import { ReactElement } from 'react';

import { useColorMode, useConst, Box, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { SubtitleProps } from './types';

import SkeletonText from '../../../../Skeleton/Text';

const dummies = _.range(25, 100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { subtitle, isLoading = false, inView = true } = props;

	const dummy = useConst<number>(_.sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height='16.5px' // Size of typography height
		>
			{inView || isLoading ? (
				<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
					<Text
						align='left'
						fontSize='xs'
						color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
					>
						{subtitle || 'Poster Subtitle'}
					</Text>
				</SkeletonText>
			) : null}
		</Box>
	);
};

export default Subtitle;
