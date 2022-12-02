import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useDummyText } from '../../../common/hooks';
import { useUserTheme } from '../../../../../common/hooks';

const DummyVerticalPosterTitle: FC = () => {
	const { colorMode } = useUserTheme();

	const title = useDummyText({ orientation: 'vertical' });

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
			<Text align='left' fontSize='sm' fontWeight='semibold' lineHeight='normal' noOfLines={1}>
				{title || 'Poster Title'}
			</Text>
		</Skeleton>
	);
};

export default DummyVerticalPosterTitle;
