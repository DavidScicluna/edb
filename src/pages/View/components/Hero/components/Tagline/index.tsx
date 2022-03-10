import { ReactElement } from 'react';

import { useColorMode, useConst, Text } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { TaglineProps } from './types';

import SkeletonText from '../../../../../../components/Skeleton/Text';
import Label from '../Label';

const dummies = range(25, 100, 15);

const Tagline = ({ tagline, isLoading = true }: TaglineProps): ReactElement => {
	const { colorMode } = useColorMode();

	const dummy = useConst<number>(sample(dummies) || 75);

	return (
		<Label width='100%' label='Tagline'>
			<SkeletonText width={isLoading ? `${dummy}px` : '100%'} fontSize='md' isLoaded={!isLoading}>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
					fontSize='md'
					fontStyle='italic'
					isTruncated
					overflow='hidden'
					whiteSpace='nowrap'
				>
					{tagline || 'Tagline'}
				</Text>
			</SkeletonText>
		</Label>
	);
};

export default Tagline;
