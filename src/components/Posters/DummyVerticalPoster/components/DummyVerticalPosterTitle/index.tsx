import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

const DummyVerticalPosterTitle: FC = () => {
	return (
		<Skeleton isLoaded={false} variant='text'>
			<Text align='left' fontSize='sm' fontWeight='semibold' noOfLines={1}>
				Poster Title
			</Text>
		</Skeleton>
	);
};

export default DummyVerticalPosterTitle;
