import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { CodeProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';

const Code = ({ code }: CodeProps): ReactElement => {
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<Text
			align='right'
			color={`${color}.${colorMode === 'light' ? 500 : 400}`}
			fontSize='8xl'
			fontWeight='extrabold'
			lineHeight='normal'
		>
			{code}
		</Text>
	);
};

export default Code;
