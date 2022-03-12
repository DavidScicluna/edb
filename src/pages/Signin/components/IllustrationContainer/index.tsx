import React, { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';

import illustration from '../../../../common/assets/illustrations/signin/illustration.svg';

const IllustrationContainer = (): ReactElement => {
	return (
		<Box
			width='100%'
			height='inherit'
			sx={{
				backgroundImage: `url(${illustration})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	);
};

export default IllustrationContainer;
