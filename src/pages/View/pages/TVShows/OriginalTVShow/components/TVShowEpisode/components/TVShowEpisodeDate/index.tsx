import { FC } from 'react';

import { FontSize, useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatDate, getFontSizeHeight } from '../../../../../../../../../common/utils';

import { TVShowEpisodeDateProps } from './types';

const { getColor } = utils;

const TVShowEpisodeDate: FC<TVShowEpisodeDateProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const fontSize = useBreakpointValue<FontSize>({
		'base': 'xs',
		'sm': 'sm',
		'md': 'md',
		'lg': 'lg',
		'xl': 'xl',
		'2xl': 'xl'
	});

	const { air_date, inView } = props;

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!air_date} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize={fontSize}
					fontWeight='normal'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{formatDate({ date: air_date || dayjs(new Date()).toISOString() })}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default TVShowEpisodeDate;
