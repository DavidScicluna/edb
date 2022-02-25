import React, { ReactElement, forwardRef } from 'react';

import { Center } from '@chakra-ui/react';

import { IconRef, IconProps } from './types';

const Icon = forwardRef<IconRef, IconProps>(function Icon({ icon, type, ...rest }, ref): ReactElement {
	return (
		<Center {...rest} ref={ref} className={`material-icons-${type}`}>
			{icon}
		</Center>
	);
});

export default Icon;
