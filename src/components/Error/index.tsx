import React, { ReactElement } from 'react';

import { useColorMode, Flex, Image, Text } from '@chakra-ui/react';

import error from '../../common/assets/illustrations/error.svg';

interface ErrorProps {
  hasIllustration?: boolean;
  label: string;
}

const Error = (props: ErrorProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { hasIllustration = true, label } = props;

  return (
    <Flex maxWidth='100%' background='transparent' direction='column' alignItems='center' justifyContent='center' p='2'>
      {hasIllustration ? (
        <Image
          maxWidth='40%'
          alt='Error illustration'
          src={error}
          // TODO: Add fallbackSrc
          // fallbackSrc={fallbackSrc || ''}
        />
      ) : null}
      <Text
        align='center'
        fontSize='sm'
        fontWeight='semibold'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        mt={2}>
        {label}
      </Text>
    </Flex>
  );
};

export default Error;
