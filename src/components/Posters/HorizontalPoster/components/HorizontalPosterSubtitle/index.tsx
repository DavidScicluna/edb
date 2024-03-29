import { ReactElement } from 'react';

import { FontSize, useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import { MediaType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { getFontSizeHeight } from '../../../../../common/utils';
import { useDummyText } from '../../../common/hooks';

import { HorizontalPosterSubtitleProps } from './types';

const { getColor } = utils;

const HorizontalPosterSubtitle = <MT extends MediaType>(props: HorizontalPosterSubtitleProps<MT>): ReactElement => {
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

	const { subtitle, inView } = props;

	const dummy = useDummyText({ orientation: 'horizontal' });

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!subtitle} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize={fontSize}
					fontWeight='normal'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{subtitle || dummy || 'Date • All Poster Genres • Subtitle'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default HorizontalPosterSubtitle;
