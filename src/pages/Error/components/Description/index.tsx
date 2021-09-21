import { ReactElement, forwardRef } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import { DescriptionRef } from '../../types';
import { DescriptionProps } from './types';

const Description = forwardRef<DescriptionRef, DescriptionProps>(function Description(props, ref): ReactElement {
  const { colorMode } = useColorMode();

  const { title, subtitle } = props;

  return (
    <VStack ref={ref} alignItems='flex-start' spacing={0}>
      <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='4xl' fontWeight='bold'>
        {title}
      </Text>
      <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md'>
        {subtitle}
      </Text>
    </VStack>
  );
});

export default Description;
