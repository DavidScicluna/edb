import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useDummyText } from '../../../common/hooks';
import { useUserTheme } from '../../../../../common/hooks';

const DummyVerticalPosterSubtitle: FC = () => {
	const { colorMode } = useUserTheme();

	const subtitle = useDummyText({ orientation: 'vertical' });

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
			<Text align='left' fontSize='xs' fontWeight='normal' lineHeight='normal' noOfLines={1}>
				{subtitle || 'Date • All Poster Genres • Subtitle'}
			</Text>
		</Skeleton>
	);
};

export default DummyVerticalPosterSubtitle;
