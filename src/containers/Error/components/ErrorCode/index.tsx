import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../common/hooks';

import { ErrorCodeProps } from './types';

const { getColor } = utils;

const ErrorCode: FC<ErrorCodeProps> = ({ code }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

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

export default ErrorCode;
