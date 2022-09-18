import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { QueryEmptyBodyProps } from './types';

const QueryEmptyBody: FC<QueryEmptyBodyProps> = ({ children, ...rest }) => {
	return (
		<VStack width='100%' alignItems='center' justifyContent='center' p={0} m={0} spacing={0} {...rest}>
			{children}
		</VStack>
	);
};

export default QueryEmptyBody;
