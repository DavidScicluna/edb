import { FC } from 'react';

import { FontSize, Skeleton } from '@davidscicluna/component-library';

import { useBreakpointValue, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { useDummyText } from '../../../common/hooks';

const DummyHorizontalPosterDescription: FC = () => {
	const { colorMode } = useUserTheme();

	const fontSize = useBreakpointValue<FontSize>({
		'base': 'xs',
		'sm': 'sm',
		'md': 'md',
		'lg': 'lg',
		'xl': 'xl',
		'2xl': 'xl'
	});

	const description = useDummyText({ orientation: 'horizontal' });

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
			<Text align='left' fontSize={fontSize} fontWeight='normal' lineHeight='normal' noOfLines={1}>
				{description || 'Full Poster Description'}
			</Text>
		</Skeleton>
	);
};

export default DummyHorizontalPosterDescription;
