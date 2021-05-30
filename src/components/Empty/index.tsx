import React, { ReactElement } from 'react';

import { useColorMode, Flex, Image, Text } from '@chakra-ui/react';

import empty from '../../common/assets/illustrations/empty.svg';

interface EmptyProps {
  hasIllustration?: boolean;
  label: string;
}

const Empty = (props: EmptyProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { hasIllustration = true, label } = props;

  return (
    <Flex maxWidth='100%' background='transparent' direction='column' alignItems='center' justifyContent='center' p='2'>
      {hasIllustration ? (
        <Image
          maxWidth='40%'
          alt='Empty illustration'
          src={empty}
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

export default Empty;
