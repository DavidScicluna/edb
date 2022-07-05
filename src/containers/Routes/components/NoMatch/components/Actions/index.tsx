import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { useLocation } from 'react-router';

import Link from '../../../../../../components/Clickable/Link';
import { RenderActionsProps as ActionsProps } from '../../../../../../pages/Error/types';

const Actions = ({ color, colorMode, size }: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const location = useLocation();

	return (
		<>
			<Link to='/' isFullWidth={isSm}>
				<Button color={color} colorMode={colorMode} isFullWidth variant='outlined' size={size}>
					Go back home
				</Button>
			</Link>
			<Link to={location.pathname} isFullWidth={isSm}>
				<Button color={color} colorMode={colorMode} isFullWidth size={size}>
					Try again
				</Button>
			</Link>
		</>
	);
};

export default Actions;
