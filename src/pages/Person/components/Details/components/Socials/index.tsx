import React, { ReactElement } from 'react';

import { HStack, VStack } from '@chakra-ui/react';

import Links from './components/Links';
import { SocialsProps } from './types';

const Socials = (props: SocialsProps): ReactElement => {
  const { orientation, ...rest } = props;

  return orientation === 'vertical' ? (
    <VStack spacing={0}>
      <Links {...rest} />
    </VStack>
  ) : (
    <HStack width='100%' spacing={0}>
      <Links {...rest} />
    </HStack>
  );
};

export default Socials;
