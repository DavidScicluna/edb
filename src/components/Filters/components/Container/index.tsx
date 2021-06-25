import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';

import { ContainerProps } from './types';

const Container = ({ children, title }: ContainerProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <VStack
      width='100%'
      alignItems='center'
      justifyContent='center'
      background='transparent'
      borderRadius='lg'
      border='solid2'
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      spacing={1.5}
      px={2}
      py={1.5}>
      <HStack
        width='100%'
        borderBottom='solid2'
        borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        pb={1.5}>
        <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' fontWeight='medium'>
          {title}
        </Text>
      </HStack>

      {children}
    </VStack>
  );
};

export default Container;
