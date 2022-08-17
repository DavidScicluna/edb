import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { SpinnerLabelProps } from './types';

const { getColor } = utils;

const SpinnerLabel: FC<SpinnerLabelProps> = ({ colorMode, ...rest }) => {
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
			Please wait while loading is finished!
		</Text>
	);
};

export default SpinnerLabel;
