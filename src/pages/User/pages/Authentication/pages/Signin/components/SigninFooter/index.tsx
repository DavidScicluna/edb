import { FC } from 'react';

import { useOutletContext } from 'react-router';

import { useTheme, InternalLink, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { compact } from 'lodash';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../types';

const SigninFooter: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	return (
		<InternalLink to='/authentication/register' isFullWidth>
			<Button color={color} colorMode={colorMode} isFullWidth size='xs' variant='text'>
				{compact([!isSm ? "Don't have an account yet?" : null, 'Create New Account!']).join(' ')}
			</Button>
		</InternalLink>
	);
};

export default SigninFooter;
