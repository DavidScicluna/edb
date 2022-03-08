import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { CodeProps } from './types';

import { useSelector } from '../../../../common/hooks';

const Code = ({ code }: CodeProps): ReactElement => {
	const { colorMode } = useColorMode();

	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Text
			align='right'
			color={`${color}.${colorMode === 'light' ? 400 : 500}`}
			fontSize='8xl'
			fontWeight='extrabold'
			lineHeight='normal'
		>
			{code}
		</Text>
	);
};

export default Code;
