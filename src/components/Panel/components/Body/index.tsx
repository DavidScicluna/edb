import { ReactElement, useContext } from 'react';

import { Box } from '@chakra-ui/react';

import { BodyProps } from './types';

import { PanelContext } from '../../.';
import { handleReturnPadding } from '../../common/utils';
import { Context } from '../../types';

const Body = (props: BodyProps): ReactElement => {
	const { size = 'md', variant = 'outlined' } = useContext<Context>(PanelContext);

	const { children, hasHeader = false, hasFooter = false } = props;

	return (
		<Box
			width='100%'
			pt={hasHeader ? handleReturnPadding(size, variant) : 0}
			pb={hasFooter ? handleReturnPadding(size, variant) : 0}
		>
			{children}
		</Box>
	);
};

export default Body;
