import { FC } from 'react';

import { FontSize, useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { getFontSizeHeight } from '../../../../../../common/utils';

import { ViewEpisodeNameProps } from './types';

const { getColor } = utils;

const ViewEpisodeName: FC<ViewEpisodeNameProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const fontSize = useBreakpointValue<FontSize>({
		'base': 'md',
		'sm': 'lg',
		'md': 'xl',
		'lg': '2xl',
		'xl': '3xl',
		'2xl': '4xl'
	});

	const { name, inView } = props;

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!name} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize={fontSize}
					fontWeight='semibold'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{name || 'Episode Name'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default ViewEpisodeName;
