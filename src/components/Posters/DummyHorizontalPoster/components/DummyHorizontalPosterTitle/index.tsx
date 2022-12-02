import { FC } from 'react';

import { FontSize, Skeleton } from '@davidscicluna/component-library';

import { useBreakpointValue, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { useDummyText } from '../../../common/hooks';

const DummyHorizontalPosterTitle: FC = () => {
	const { colorMode } = useUserTheme();

	const fontSize = useBreakpointValue<FontSize>({
		'base': 'md',
		'sm': 'lg',
		'md': 'xl',
		'lg': '2xl',
		'xl': '3xl',
		'2xl': '4xl'
	});

	const title = useDummyText({ orientation: 'horizontal' });

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
			<Text align='left' fontSize={fontSize} fontWeight='semibold' lineHeight='normal' noOfLines={1}>
				{title || 'Poster Title'}
			</Text>
		</Skeleton>
	);
};

export default DummyHorizontalPosterTitle;
