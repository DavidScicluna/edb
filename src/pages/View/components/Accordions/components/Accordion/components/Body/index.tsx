import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import { BodyProps } from './types';

const Body = ({ children }: BodyProps): ReactElement => {
  return (
    <VStack width='100%' spacing={0} py={2}>
      {children}
    </VStack>
  );
};

export default Body;
