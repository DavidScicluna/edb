import { FC } from 'react';

import { useOutletContext } from 'react-router';

import { Box } from '@chakra-ui/react';

import signin from '../../../../../../common/assets/illustrations';
import { colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../types';

import { IllustrationProps } from './types';

const Illustration: FC<IllustrationProps> = ({ illustration, ...rest }) => {
	const { colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	return (
		<Box
			{...rest}
			sx={{
				backgroundImage: `url(${signin[colorMode][illustration]})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	);
};

export default Illustration;
