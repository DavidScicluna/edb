import { FC } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { PageProps } from './types';

const Page: FC<PageProps> = ({ children, ...rest }) => {
	return (
		<VStack {...rest} width='100%' divider={<Divider />} spacing={0}>
			{children}
		</VStack>
	);
};

export default Page;
