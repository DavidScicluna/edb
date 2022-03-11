import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, useConst, Text } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { TitleProps } from './types';

import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 100, 5);

const Title = (props: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { title, isLoading = false } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<SkeletonText width={isLoading ? `${dummy}%` : '100%'} fontSize='sm' isLoaded={!isLoading}>
			<Text
				align='left'
				fontSize={isSm ? 'md' : 'lg'}
				fontWeight='semibold'
				color={`gray.${colorMode === 'light' ? 900 : 50}`}
				isTruncated
				overflow='hidden'
				whiteSpace='nowrap'
			>
				{title || 'Last Episode Title'}
			</Text>
		</SkeletonText>
	);
};

export default Title;
