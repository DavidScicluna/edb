import { ReactElement } from 'react';

import { useConst, Box, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import SkeletonText from '../../../../../../../Skeleton/Text';

import { TitleProps } from './types';

const dummies = range(25, 100, 5);

const Title = (props: TitleProps): ReactElement => {
	const { title, isLoading = false, inView = true, colorMode } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={['19.25px', '22px', '24.75px']} // Size of typography height
		>
			{inView ? (
				<SkeletonText
					colorMode={colorMode}
					width={isLoading ? `${dummy}%` : 'auto'}
					fontSize='sm'
					isLoaded={!isLoading}
				>
					<Text
						align='left'
						fontSize={['sm', 'md', 'lg']}
						fontWeight='semibold'
						color={`gray.${colorMode === 'light' ? 900 : 50}`}
						noOfLines={1}
					>
						{title || 'Title'}
					</Text>
				</SkeletonText>
			) : null}
		</Box>
	);
};

export default Title;
