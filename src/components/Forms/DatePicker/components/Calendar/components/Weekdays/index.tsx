import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import weekdays from '../../../../common/data/weekdays';

const Weekdays = (): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<HStack width='100%' justifyContent='space-between' spacing={0}>
			{weekdays.map((weekday, index) => (
				<Text
					key={index}
					width='100%'
					align='center'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
					fontWeight='semibold'
					fontSize='sm'
					textTransform='uppercase'
				>
					{weekday}
				</Text>
			))}
		</HStack>
	);
};

export default Weekdays;
