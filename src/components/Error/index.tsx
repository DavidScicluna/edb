import React, { ReactElement } from 'react';

import { useColorMode, VStack, Image, Text, Fade } from '@chakra-ui/react';

import error from '../../common/assets/illustrations/error.svg';
import { ErrorProps } from './types';

const Error = (props: ErrorProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { hasIllustration = true, label, variant = 'transparant' } = props;

  return (
    <Fade in>
      <VStack
        width='100%'
        background='transparent'
        borderRadius='lg'
        border='solid2'
        borderColor={variant === 'outlined' ? (colorMode === 'light' ? 'gray.200' : 'gray.700') : 'transparent'}
        spacing={2}
        px={2}
        py={6}>
        {hasIllustration ? <Image maxWidth='40%' alt='Error illustration' src={error} /> : null}
        <Text align='center' fontSize='md' fontWeight='semibold' color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
          {label}
        </Text>
      </VStack>
    </Fade>
  );
};

export default Error;
