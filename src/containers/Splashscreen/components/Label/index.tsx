import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { LabelProps } from './types';

const { getColor } = utils;

const Label: FC<LabelProps> = ({ colorMode, ...rest }) => {
	const theme = useTheme();

	return (
		<Text
			{...rest}
			align='center'
			color={getColor({ theme, colorMode, type: 'text.secondary' })}
			fontSize='xs'
			fontWeight='semibold'
			whiteSpace='nowrap'
			textTransform='uppercase'
		>
			entertainment database
		</Text>
	);
};

export default Label;
