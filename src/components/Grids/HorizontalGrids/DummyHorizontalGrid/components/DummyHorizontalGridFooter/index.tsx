import { FC } from 'react';

import { Center } from '@chakra-ui/react';

import { DummyHorizontalGridFooterProps } from './types';

const DummyHorizontalGridFooter: FC<DummyHorizontalGridFooterProps> = ({ children, ...rest }) => {
	return (
		<Center {...rest} width='100%'>
			{children}
		</Center>
	);
};

export default DummyHorizontalGridFooter;
