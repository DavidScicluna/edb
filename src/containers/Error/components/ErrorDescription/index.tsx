import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../common/hooks';

import { ErrorDescriptionProps } from './types';

const { getColor } = utils;

const ErrorDescription: FC<ErrorDescriptionProps> = ({ title, subtitle }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<VStack alignItems='flex-start' justifyContent='center' spacing={0.5}>
			<Text
				align='left'
				color={getColor({ theme, colorMode, type: 'text.primary' })}
				fontSize='4xl'
				fontWeight='bold'
			>
				{title}
			</Text>
			<Text align='left' color={getColor({ theme, colorMode, type: 'text.secondary' })} fontSize='md'>
				{subtitle}
			</Text>
		</VStack>
	);
};

export default ErrorDescription;
