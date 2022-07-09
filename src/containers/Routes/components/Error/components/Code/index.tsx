import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useColorMode, Text } from '@chakra-ui/react';

import { useGetUserTheme } from '../../../../../../common/hooks';

import { CodeProps } from './types';

const { getColor } = utils;

const Code: FC<CodeProps> = ({ code }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();
	const { color } = useGetUserTheme();

	return (
		<Text
			align='right'
			color={getColor({ theme, colorMode, color, type: 'color' })}
			fontSize='8xl'
			fontWeight='extrabold'
			lineHeight='normal'
		>
			{code}
		</Text>
	);
};

export default Code;
