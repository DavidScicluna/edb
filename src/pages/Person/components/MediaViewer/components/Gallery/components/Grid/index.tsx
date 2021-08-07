import React, { ReactElement } from 'react';

import { useColorMode, VStack, SimpleGrid, Text } from '@chakra-ui/react';

import { GridProps } from './types';

const Grid = ({ children, title }: GridProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <VStack width='100%' justifyContent='stretch' spacing={2}>
      <Text
        width='100%'
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='xl'
        fontWeight='semibold'>
        {title}
      </Text>

      <SimpleGrid width='100%' columns={4} spacing={2}>
        {children}
      </SimpleGrid>
    </VStack>
  );
};

export default Grid;
