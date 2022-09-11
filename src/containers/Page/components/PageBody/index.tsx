import { FC } from 'react';

import { Box, BoxProps as PageBodyProps } from '@chakra-ui/react';

const PageBody: FC<PageBodyProps> = ({ children, ...rest }) => {
	return (
		<Box {...rest} width='100%'>
			{children}
		</Box>
	);
};

export default PageBody;
