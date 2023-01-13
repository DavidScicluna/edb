import { FC } from 'react';

import { FontSize, useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { getFontSizeHeight } from '../../../../../../../../../common/utils';

import { TVShowEpisodeOverviewProps } from './types';

const { getColor } = utils;

const TVShowEpisodeOverview: FC<TVShowEpisodeOverviewProps> = (props) => {
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

	const { overview, inView } = props;

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!overview} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize={fontSize}
					fontWeight='normal'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{overview || 'Episode Overview'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default TVShowEpisodeOverview;
