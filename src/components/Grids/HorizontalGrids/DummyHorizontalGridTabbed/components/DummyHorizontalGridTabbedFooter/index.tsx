import { FC } from 'react';

import { Center } from '@chakra-ui/react';

import { DummyHorizontalGridTabbedFooterProps } from './types';

const DummyHorizontalGridTabbedFooter: FC<DummyHorizontalGridTabbedFooterProps> = ({ children, ...rest }) => {
	return (
		<Center {...rest} width='100%'>
			{children}
		</Center>
	);
};

export default DummyHorizontalGridTabbedFooter;
