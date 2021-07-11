import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';

import Card from '../../../../../../../components/Card';
import { ContainerProps } from './types';

const Container = ({ children, title }: ContainerProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Card isFullWidth variant='outlined' p={2} pt={1.5} pb={2}>
      <VStack width='100%' spacing={2}>
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
    </Card>
  );
};

export default Container;
