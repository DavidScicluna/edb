import { FC } from 'react';

import { FontSize, useTheme, Skeleton } from '@davidscicluna/component-library';

import { useBreakpointValue, Box, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { getFontSizeHeight } from '../../../../../../common/utils';

const ViewDummyEpisodeName: FC = () => {
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

	return (
		<Box width='100%' maxWidth='100%' height={`${getFontSizeHeight({ theme, fontSize, lineHeight: 'normal' })}px`}>
			<Skeleton colorMode={colorMode} isLoaded={false} variant='text' speed={-1}>
				<Text align='left' fontSize={fontSize} fontWeight='semibold' lineHeight='normal' noOfLines={1}>
					Episode Name
				</Text>
			</Skeleton>
		</Box>
	);
};

export default ViewDummyEpisodeName;
