import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import { DummyHorizontalGridScrollProps } from './types';

const DummyHorizontalGridScroll: FC<DummyHorizontalGridScrollProps> = ({ children, spacing = 2 }) => {
	return (
		<HStack width='fit-content' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
			{children}
		</HStack>
	);
};

export default DummyHorizontalGridScroll;
