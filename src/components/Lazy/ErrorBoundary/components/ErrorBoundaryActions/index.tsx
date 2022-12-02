import { FC } from 'react';

import { useTheme, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { ErrorBoundaryActionsProps } from './types';

const ErrorBoundaryActions: FC<ErrorBoundaryActionsProps> = (props) => {
	const theme = useTheme();
	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<Button {...props} isFullWidth={isSm} onClick={() => window.location.reload()}>
			Refresh
		</Button>
	);
};

export default ErrorBoundaryActions;
