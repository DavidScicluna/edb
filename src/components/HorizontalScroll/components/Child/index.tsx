import React, { ReactElement } from 'react';

import { Center } from '@chakra-ui/react';

import { ChildProps } from './types';

const Child = ({ divider, children, isLast = false }: ChildProps): ReactElement => {
  return (
    <Center wrap='nowrap'>
      {children}

      {divider && !isLast ? <Center px={1}>{divider}</Center> : null}
    </Center>
  );
};

export default Child;
