import { ReactElement, forwardRef } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { GlassRef, GlassProps } from './types';

// TODO: Maybe move component to component-library
const Glass = forwardRef<GlassRef, GlassProps>(function Glass(props, ref): ReactElement {
	const theme = useTheme();

	const { children, size = 2, ...rest } = props;

	return (
		<Center {...rest} ref={ref} backdropFilter={`blur(${theme.space[size]})`}>
			{children}
		</Center>
	);
});

export default Glass;
