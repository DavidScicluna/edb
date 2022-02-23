import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { TitleProps } from './types';

const Title = (props: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { title } = props;

	return typeof title === 'string' ? (
		<Text
			align='left'
			color={`gray.${colorMode === 'light' ? 900 : 50}`}
			fontSize={['2xl', '2xl', '3xl', '3xl', '3xl', '3xl']}
			fontWeight='bold'
		>
			{title || 'Page title'}
		</Text>
	) : (
		title
	);
};

export default Title;
