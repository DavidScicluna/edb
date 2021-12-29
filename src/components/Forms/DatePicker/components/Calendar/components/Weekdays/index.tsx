import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import weekdays from '../../../../common/data/weekdays';

const Weekdays = (): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <HStack width='100%' justifyContent='space-between' spacing={2}>
      {weekdays.map((weekday, index) => (
        <Text
          key={index}
          width='100%'
          align='center'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontWeight='semibold'
          fontSize='sm'
          textTransform='uppercase'
          px={2}
          py={1}
        >
          {weekday}
        </Text>
      ))}
    </HStack>
  );
};

export default Weekdays;
