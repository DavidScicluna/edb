import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';

import Card from '../../../Card';
import { ContainerProps } from './types';

const Container = ({ children, title, actions }: ContainerProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Card isFullWidth variant='outlined' p={2} pt={actions ? 0.75 : 1.5} pb={2}>
      <VStack width='100%' spacing={2}>
        <HStack
          width='100%'
          justifyContent='space-between'
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          spacing={2}
          pb={actions ? 0.75 : 1.5}>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' fontWeight='medium'>
            {title}
          </Text>
          {actions}
        </HStack>

        {children}
      </VStack>
    </Card>
  );
};

export default Container;
