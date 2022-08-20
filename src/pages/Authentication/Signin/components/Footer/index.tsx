import { FC } from 'react';

import { InternalLink, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';

const Footer: FC = () => {
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<InternalLink to='/register' isFullWidth>
			<Button color={color} colorMode={colorMode} isFullWidth size='xs' variant='text'>
				{compact([!isSm ? "Don't have an account yet?" : null, 'Create New Account!']).join(' ')}
			</Button>
		</InternalLink>
	);
};

export default Footer;
