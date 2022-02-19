import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, useConst, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { TitleProps } from './types';

import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

const dummies = _.range(25, 100, 10);

const Title = (props: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { title, isLoading = false } = props;

	const dummy = useConst<number>(_.sample(dummies) || 100);

	return (
		<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='sm' isLoaded={!isLoading}>
			<Text
				align='left'
				fontSize={isSm ? 'md' : 'lg'}
				fontWeight='semibold'
				color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
				isTruncated
				overflow='hidden'
				whiteSpace='nowrap'
			>
				{!isLoading ? title : 'Lorem ipsum'}
			</Text>
		</SkeletonText>
	);
};

export default Title;
