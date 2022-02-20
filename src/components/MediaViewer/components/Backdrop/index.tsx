import React from 'react';

import { useTheme, useColorMode, Box, Fade } from '@chakra-ui/react';

import { BackdropProps } from './types';

import { Theme } from '../../../../theme/types';

const Backdrop = ({ isHovering = false }: BackdropProps) => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	return (
		<Box
			as={Fade}
			in={isHovering}
			width='100%'
			height='100vh'
			position='absolute'
			zIndex={3}
			unmountOnExit
			sx={{
				backdropFilter: 'blur(12px)',
				backgroundColor: colorMode === 'light' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.5)',
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-in-out']}`
			}}
		/>
	);
};

export default Backdrop;
