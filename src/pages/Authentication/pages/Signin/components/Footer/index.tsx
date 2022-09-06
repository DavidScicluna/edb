import { FC } from 'react';

import { InternalLink, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { compact } from 'lodash';

import { SignInCommonProps as FooterProps } from '../../common/types';
import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';

const Footer: FC<FooterProps> = ({ color = defaultColor, colorMode = defaultColorMode }) => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<InternalLink to='/authentication/register' isFullWidth>
			<Button color={color} colorMode={colorMode} isFullWidth size='xs' variant='text'>
				{compact([!isSm ? "Don't have an account yet?" : null, 'Create New Account!']).join(' ')}
			</Button>
		</InternalLink>
	);
};

export default Footer;
