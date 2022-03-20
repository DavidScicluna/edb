import React, { ReactElement } from 'react';

import { useColorMode, Box } from '@chakra-ui/react';

import * as signin from '../../../../common/assets/illustrations/signin';

const IllustrationContainer = (): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<Box
			width='100%'
			height='inherit'
			sx={{
				backgroundImage: `url(${colorMode === 'light' ? signin.default.light : signin.default.dark})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	);
};

export default IllustrationContainer;
