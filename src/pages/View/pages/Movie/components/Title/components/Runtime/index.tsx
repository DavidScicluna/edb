import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { RuntimeProps } from './types';

import { handleReturnRuntime } from '../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 200, 5);

const Runtime = (props: RuntimeProps): ReactElement => {
	const { runtime, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{handleReturnRuntime(runtime || 0) || 'Movie Runtime'}
			</Text>
		</SkeletonText>
	);
};

export default Runtime;
