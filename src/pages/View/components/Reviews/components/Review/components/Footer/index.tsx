import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import { FooterProps } from './types';

const Footer = (props: FooterProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { date, renderActions } = props;

	return (
		<HStack width='100%' alignItems='center' justifyContent='space-between'>
			<Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
				{date}
			</Text>

			{renderActions}
		</HStack>
	);
};

export default Footer;
