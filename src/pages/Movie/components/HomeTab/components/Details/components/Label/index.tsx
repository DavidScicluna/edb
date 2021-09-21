import { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import { LabelProps } from './types';

const Label = ({ children, label, ...rest }: LabelProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <VStack {...rest} alignItems='flex-start' spacing={0}>
      <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' fontWeight='semibold'>
        {label}
      </Text>
      {children}
    </VStack>
  );
};

export default Label;
