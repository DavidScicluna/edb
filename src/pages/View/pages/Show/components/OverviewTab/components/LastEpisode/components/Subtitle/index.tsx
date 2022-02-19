import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, useConst, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { SubtitleProps } from './types';

import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

const dummies = _.range(25, 100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { subtitle, isLoading = false } = props;

	const dummy = useConst<number>(_.sample(dummies) || 100);

	return (
		<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
			<Text
				align='left'
				fontSize={isSm ? 'xs' : 'sm'}
				color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
				isTruncated
				overflow='hidden'
				whiteSpace='nowrap'
			>
				{subtitle || 'Last Episode Subtitle'}
			</Text>
		</SkeletonText>
	);
};

export default Subtitle;
