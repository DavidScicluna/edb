import { FC } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { Box, Text } from '@chakra-ui/react';

import { useDummyText } from '../../../common/hooks';
import { getFontSizeHeight } from '../../../../../common/utils';

const DummyVerticalPosterSubtitle: FC = () => {
	const theme = useTheme();

	const subtitle = useDummyText();

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={`${getFontSizeHeight({ theme, fontSize: 'xs', lineHeight: 'normal' })}px`}
		>
			<Skeleton isLoaded={false} variant='text'>
				<Text align='left' fontSize='xs' fontWeight='normal' lineHeight='normal' noOfLines={1}>
					{subtitle || 'Date • All Poster Genres • Subtitle'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default DummyVerticalPosterSubtitle;
