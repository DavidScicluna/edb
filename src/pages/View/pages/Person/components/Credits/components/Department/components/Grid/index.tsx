import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Divider from '../../../../../../../../../../components/Divider';
import { GridProps } from './types';

const Grid = ({ children }: GridProps): ReactElement => {
  return (
    <VStack width='100%' spacing={2} px={2} pb={2}>
      <Divider />

      {children}
    </VStack>
  );
};

export default Grid;
