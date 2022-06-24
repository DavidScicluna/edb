import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import Label from '../../../../components/Label';

import { TaglineProps } from './types';

const dummies = range(25, 200, 5);

const Tagline = ({ tagline, isLoading = true }: TaglineProps): ReactElement => {
	const { colorMode } = useColorMode();

	const dummy = useConst<number>(sample(dummies) || 75);

	return (
		<Label width='100%' label='Tagline'>
			<Skeleton width={isLoading ? `${dummy}px` : 'auto'} isLoaded={!isLoading} type='text'>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
					fontSize='md'
					fontStyle='italic'
					whiteSpace='nowrap'
				>
					{tagline || 'TV Show Tagline'}
				</Text>
			</Skeleton>
		</Label>
	);
};

export default Tagline;
