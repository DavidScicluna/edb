import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, useConst, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import { SubtitleProps } from './types';

import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 100, 5);

const Subtitle = (props: SubtitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { subtitle, isLoading = false } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<SkeletonText width={isLoading ? `${dummy}%` : '100%'} fontSize='xs' isLoaded={!isLoading}>
			<Text
				align='left'
				fontSize={isSm ? 'xs' : 'sm'}
				color={`gray.${colorMode === 'light' ? 400 : 500}`}
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
