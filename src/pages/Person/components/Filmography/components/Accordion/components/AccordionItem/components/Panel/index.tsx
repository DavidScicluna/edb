import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';

import Card from '../../../../../../../../../../components/Card';
import { ListProps } from './types';

const Panel = ({ children, title }: ListProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Card isFullWidth variant='transparent'>
      <VStack width='100%' alignItems='stretch' spacing={1}>
        <HStack
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          spacing={0}
          pb={1}>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xl' fontWeight='medium'>
            {title}
          </Text>
        </HStack>

        <VStack width='100%' spacing={2}>
          {children}
        </VStack>
      </VStack>
    </Card>
  );
};

export default Panel;
