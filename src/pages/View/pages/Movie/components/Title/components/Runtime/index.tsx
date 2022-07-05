import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useConst, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import { handleReturnRuntime } from '../../../../../../../../common/utils';

import { RuntimeProps } from './types';

const dummies = range(25, 200, 5);

const Runtime = (props: RuntimeProps): ReactElement => {
	const { runtime, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<Skeleton width={isLoading ? `${dummy}px` : 'auto'} isLoaded={!isLoading} variant='text'>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{handleReturnRuntime(runtime || 0) || 'Movie Runtime'}
			</Text>
		</Skeleton>
	);
};

export default Runtime;
