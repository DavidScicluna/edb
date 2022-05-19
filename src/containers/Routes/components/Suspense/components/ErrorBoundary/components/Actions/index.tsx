import React, { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { RenderActionsProps as ActionsProps } from '../../../../../../../../pages/Error/types';

const Actions = ({ color, colorMode, size }: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<Button
			color={color}
			colorMode={colorMode}
			isFullWidth={isSm}
			onClick={() => window.location.reload()}
			size={size}
		>
			Refresh
		</Button>
	);
};

export default Actions;
