import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { ViewHeroVStackProps } from './types';

const ViewHeroVStack: FC<ViewHeroVStackProps> = ({ children, ...rest }) => {
	return (
		<VStack {...rest} width='100%' alignItems='stretch' justifyContent='stretch' spacing={2}>
			{children}
		</VStack>
	);
};

export default ViewHeroVStack;
