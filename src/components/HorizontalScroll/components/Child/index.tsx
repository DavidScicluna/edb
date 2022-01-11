import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';

import { ChildProps } from './types';

const Child = ({ divider, children, isLast = false }: ChildProps): ReactElement => {
  return (
    <HStack
      alignItems='center'
      justifyContent='center'
      wrap='nowrap'
      spacing={0}
      // mr={!isLast ? 2 : 0}
    >
      {children}

      {divider && !isLast ? divider : null}
    </HStack>
  );
};

export default Child;
