import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { TitleProps } from './types';

const Title = ({ children }: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<Text
			align='left'
			color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
			fontSize='lg'
			fontWeight='bold'
			whiteSpace='nowrap'
		>
			{children}
		</Text>
	);
};

export default Title;
