import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Text } from '@chakra-ui/react';

import { TitleProps } from './types';

const Title = ({ children }: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<Text
			align='left'
			color={`gray.${colorMode === 'light' ? 400 : 500}`}
			fontSize={isSm ? 'md' : 'lg'}
			fontWeight='bold'
			isTruncated
			overflow='hidden'
			whiteSpace='nowrap'
		>
			{children}
		</Text>
	);
};

export default Title;
