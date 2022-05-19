import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';


import { handleReturnRuntime } from '../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

import { RuntimeProps } from './types';

const dummies = range(25, 200, 5);

const Runtime = (props: RuntimeProps): ReactElement => {
	const { runtime, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{handleReturnRuntime(runtime || 0) || 'TV Show Runtime'}
			</Text>
		</SkeletonText>
	);
};

export default Runtime;
