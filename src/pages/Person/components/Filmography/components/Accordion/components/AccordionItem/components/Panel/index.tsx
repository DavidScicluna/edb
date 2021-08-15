import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, HStack, Text } from '@chakra-ui/react';

import Card from '../../../../../../../../../../components/Card';
import Badge from '../Badge';
import { ListProps } from './types';

const Panel = ({ children, title, total }: ListProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

  return (
    <Card isFullWidth variant='transparent'>
      <VStack width='100%' alignItems='stretch' spacing={1}>
        <HStack
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          justifyContent='space-between'
          spacing={1}
          pb={1}>
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            fontSize={isSm ? 'md' : 'xl'}
            fontWeight='medium'>
            {title}
          </Text>
          <Badge label={String(total)} size={isSm ? 'sm' : 'md'} ml={2} />
        </HStack>

        <VStack width='100%' spacing={2}>
          {children}
        </VStack>
      </VStack>
    </Card>
  );
};

export default Panel;
