import { FC } from 'react';

import { CardBody } from '@davidscicluna/component-library';

import { Box } from '@chakra-ui/react';

import { DummyHorizontalGridBodyProps } from './types';

const DummyHorizontalGridBody: FC<DummyHorizontalGridBodyProps> = ({ children, ...rest }) => {
	return (
		<CardBody {...rest}>
			<Box alignItems='stretch' justifyContent='stretch'>
				{children}
			</Box>
		</CardBody>
	);
};

export default DummyHorizontalGridBody;
