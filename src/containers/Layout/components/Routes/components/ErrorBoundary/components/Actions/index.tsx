import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import Button from '../../../../../../../../components/Clickable/Button';
import Link from '../../../../../../../../components/Clickable/Link';
import { RenderActionsProps as ActionsProps } from '../../../../../../../../pages/Error/types';

const Actions = ({ color, colorMode, size }: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<>
			<Link to='/' isFullWidth={isSm}>
				<Button color={color} colorMode={colorMode} isFullWidth variant='outlined' size={size}>
					Go back home
				</Button>
			</Link>
			<Button
				color={color}
				colorMode={colorMode}
				isFullWidth={isSm}
				onClick={() => window.location.reload()}
				size={size}
			>
				Refresh
			</Button>
		</>
	);
};

export default Actions;
