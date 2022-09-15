import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

const DummyVerticalPosterSubtitle: FC = () => {
	return (
		<Skeleton isLoaded={false} variant='text'>
			<Text align='left' fontSize='xs' fontWeight='normal' noOfLines={1}>
				Poster Subtitle
			</Text>
		</Skeleton>
	);
};

export default DummyVerticalPosterSubtitle;
