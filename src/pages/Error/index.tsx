import React, { ReactElement, useRef } from 'react';

import { useColorMode, Center, HStack, Box, VStack, Text } from '@chakra-ui/react';

import { useSelector, useElementSize } from '../../common/hooks';
import { headerHeight } from '../../containers/Layout/common/data/dimensions';
import { ErrorProps } from './types';

const Error = (props: ErrorProps): ReactElement => {
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { height } = useElementSize(descriptionRef);

  const { code = 404, title, subtitle, actions } = props;

  return (
    <Center width='100%' minHeight={`calc(100vh - ${headerHeight}px)`}>
      <VStack spacing={4}>
        <HStack spacing={2}>
          <Text align='right' color={`${color}.${colorMode === 'light' ? 400 : 500}`} fontSize='6xl' fontWeight='bold'>
            {code}
          </Text>
          <Box width='2px' height={height} backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
          <VStack ref={descriptionRef} alignItems='flex-start' spacing={0}>
            <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='4xl' fontWeight='bold'>
              {title}
            </Text>
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md'>
              {subtitle}
            </Text>
          </VStack>
        </HStack>

        <HStack alignItems='flex-start' spacing={2}>
          {actions}
        </HStack>
      </VStack>
    </Center>
  );
};

export default Error;
