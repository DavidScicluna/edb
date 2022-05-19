import { ReactElement } from 'react';

import { useColorMode, useConst, Box, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import SkeletonText from '../../../../Skeleton/Text';

import { SubtitleProps } from './types';


const dummies = range(25, 100, 5);

const Subtitle = (props: SubtitleProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { subtitle, isLoading = false, inView = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height='16.5px' // Size of typography height
		>
			{inView ? (
				<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
					<Text
						align='left'
						fontSize='xs'
						fontWeight='normal'
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
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
