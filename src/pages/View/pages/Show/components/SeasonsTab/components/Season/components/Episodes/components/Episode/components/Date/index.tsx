import { ReactElement } from 'react';

import { FontSize, Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useBreakpointValue, useConst, Box, Text } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { handleReturnDate } from '../../../../../../../../../../../../../../common/utils';

import { DateProps } from './types';

const dummies = range(25, 100, 5);
const height = ['16.5px', '19.25px', '22px', '24.75px', '27.5px', '33px'];

const Date = (props: DateProps): ReactElement => {
	const { colorMode } = useColorMode();
	const fontSize = useBreakpointValue<FontSize>({
		'base': 'xs',
		'sm': 'sm',
		'md': 'md',
		'lg': 'lg',
		'xl': 'xl',
		'2xl': '2xl'
	});

	const { date, isLoading = false, inView = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={height} // Size of typography height
		>
			{inView ? (
				<Skeleton width={isLoading ? `${dummy}%` : 'auto'} isLoaded={!isLoading} type='text'>
					<Text
						align='left'
						fontSize={fontSize}
						fontWeight='normal'
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
						noOfLines={1}
					>
						{!(isNil(date) || isEmpty(date)) ? handleReturnDate(date || '', 'full') : 'Episode Date'}
					</Text>
				</Skeleton>
			) : null}
		</Box>
	);
};

export default Date;
