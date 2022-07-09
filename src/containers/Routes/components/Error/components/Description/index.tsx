import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import { DescriptionProps } from './types';

const { getColor } = utils;

const Description: FC<DescriptionProps> = ({ title, subtitle }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	return (
		<VStack alignItems='flex-start' spacing={0.5}>
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

export default Description;
