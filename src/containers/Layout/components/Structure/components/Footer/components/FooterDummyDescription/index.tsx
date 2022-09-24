import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

const FooterDummyDescription: FC = () => {
	return (
		<VStack width='100%' spacing={0.5}>
			{range(5).map((_dummy, index) => (
				<Skeleton key={index} width='100%' isLoaded={false} variant='text'>
					<Text align='left' fontSize='sm'>
						This is dummy text
					</Text>
				</Skeleton>
			))}
		</VStack>
	);
};

export default FooterDummyDescription;
