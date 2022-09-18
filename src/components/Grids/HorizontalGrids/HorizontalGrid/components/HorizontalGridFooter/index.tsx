import { FC } from 'react';

import { Center } from '@chakra-ui/react';

import { HorizontalGridFooterProps } from './types';

const HorizontalGridFooter: FC<HorizontalGridFooterProps> = ({ children, ...rest }) => {
	return (
		<Center {...rest} width='100%'>
			{children}
		</Center>
	);
};

export default HorizontalGridFooter;
