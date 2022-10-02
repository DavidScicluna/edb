import { FC } from 'react';

import { FontSize, useTheme, Skeleton } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { getFontSizeHeight } from '../../../../../common/utils';
import { useDummyText } from '../../../common/hooks';

const DummyHorizontalPosterSubtitle: FC = () => {
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

	const subtitle = useDummyText();

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
				<Text align='left' fontSize={fontSize} fontWeight='normal' lineHeight='normal' noOfLines={1}>
					{subtitle || 'Date • All Poster Genres • Subtitle'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default DummyHorizontalPosterSubtitle;
