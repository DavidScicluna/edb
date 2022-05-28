import { ReactElement } from 'react';

import { useColorMode, useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';


import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import Label from '../../../../components/Label';

import { TaglineProps } from './types';

const dummies = range(25, 200, 5);

const Tagline = ({ tagline, isLoading = true }: TaglineProps): ReactElement => {
	const { colorMode } = useColorMode();

	const dummy = useConst<number>(sample(dummies) || 75);

	return (
		<Label width='100%' label='Tagline'>
			<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
					fontSize='md'
					fontStyle='italic'
					whiteSpace='nowrap'
				>
					{tagline || 'Movie Tagline'}
				</Text>
			</SkeletonText>
		</Label>
	);
};

export default Tagline;
