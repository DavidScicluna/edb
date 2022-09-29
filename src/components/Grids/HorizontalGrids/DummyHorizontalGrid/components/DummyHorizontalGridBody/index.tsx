import { FC } from 'react';

import { CardBody } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { DummyHorizontalGridBodyProps } from './types';

const DummyHorizontalGridBody: FC<DummyHorizontalGridBodyProps> = ({ children, spacing = 2, ...rest }) => {
	return (
		<CardBody {...rest}>
			<HStack spacing={spacing}>{children}</HStack>
		</CardBody>
	);
};

export default DummyHorizontalGridBody;
