import { ReactElement } from 'react';

import { FontSize, useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import { MediaType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { inView as defaultInView } from '../../../common/data/defaultPropValues';
import { getFontSizeHeight } from '../../../../../common/utils';
import { useDummyText } from '../../../common/hooks';

import { HorizontalPosterDescriptionProps } from './types';

const { getColor } = utils;

const HorizontalPosterDescription = <MT extends MediaType>(
	props: HorizontalPosterDescriptionProps<MT>
): ReactElement => {
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

	const { description, inView = defaultInView } = props;

	const dummy = useDummyText();

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!description} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize={fontSize}
					fontWeight='normal'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{description || dummy || 'Full Poster Description'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default HorizontalPosterDescription;
