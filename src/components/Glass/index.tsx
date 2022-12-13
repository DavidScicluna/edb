import { ReactElement, forwardRef } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { merge } from 'lodash';

import { GlassRef, GlassProps } from './types';

// TODO: Maybe move component to component-library

const Glass = forwardRef<GlassRef, GlassProps>(function Glass(props, ref): ReactElement {
	const theme = useTheme();

	const { children, sx, ...rest } = props;

	return (
		<Center
			{...rest}
			ref={ref}
			sx={{
				...merge(
					{
						backdropFilter: `blur(${theme.space[2]})`,
						WebkitBackdropFilter: `blur(${theme.space[2]})`
					},
					sx
				)
			}}
		>
			{children}
		</Center>
	);
});

export default Glass;