import { ReactElement } from 'react';

import { FontSize, useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import { MediaType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { inView as defaultInView } from '../../../common/data/defaultPropValues';
import { getFontSizeHeight } from '../../../../../common/utils';
import { useDummyText } from '../../../common/hooks';

import { HorizontalPosterTitleProps } from './types';

const { getColor } = utils;

const HorizontalPosterTitle = <MT extends MediaType>(props: HorizontalPosterTitleProps<MT>): ReactElement => {
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

	const { title, inView = defaultInView } = props;

	const dummy = useDummyText({ orientation: 'horizontal' });

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!title} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize={fontSize}
					fontWeight='semibold'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{title || dummy || 'Poster Title'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default HorizontalPosterTitle;
