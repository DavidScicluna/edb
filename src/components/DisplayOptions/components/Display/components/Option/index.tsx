import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import { OptionProps } from './types';

const Option = ({ children, label, isActive = false }: OptionProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <VStack alignItems='center' justifyContent='center' spacing={1}>
      {children}
      <Text
        width='100%'
        align='center'
        color={isActive ? 'blue.400' : colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='sm'
        fontWeight='medium'
        mt={1}>
        {label}
      </Text>
    </VStack>
  );
};

export default Option;
