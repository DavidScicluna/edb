import { FC } from 'react';

import { useTheme, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { SuspenseActionsProps } from './types';

const SuspenseActions: FC<SuspenseActionsProps> = (props) => {
	const theme = useTheme();
	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<Button {...props} isFullWidth={isSm} onClick={() => window.location.reload()}>
			Refresh
		</Button>
	);
};

export default SuspenseActions;
