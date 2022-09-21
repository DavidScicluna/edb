import { FC } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { Box, Text } from '@chakra-ui/react';

import { getFontSizeHeight } from '../../../../../common/utils';
import { useDummyText } from '../../../common/hooks';

const DummyVerticalPosterTitle: FC = () => {
	const theme = useTheme();

	const title = useDummyText();

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={`${getFontSizeHeight({ theme, fontSize: 'sm', lineHeight: 'normal' })}px`}
		>
			<Skeleton isLoaded={false} variant='text'>
				<Text align='left' fontSize='sm' fontWeight='semibold' lineHeight='normal' noOfLines={1}>
					{title || 'Poster Title'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default DummyVerticalPosterTitle;
