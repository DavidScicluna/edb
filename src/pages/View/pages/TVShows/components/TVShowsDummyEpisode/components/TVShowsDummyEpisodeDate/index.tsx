import { FC } from 'react';

import { FontSize, useTheme, Skeleton } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { formatDate, getFontSizeHeight } from '../../../../../../../../common/utils';

const TVShowsDummyEpisodeDate: FC = () => {
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

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={false} variant='text' speed={-1}>
				<Text align='left' fontSize={fontSize} fontWeight='normal' lineHeight='normal' noOfLines={1}>
					{formatDate({ date: dayjs(new Date()).toISOString() })}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default TVShowsDummyEpisodeDate;
