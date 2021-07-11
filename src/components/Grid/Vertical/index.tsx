import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Header from './components/Header';
import { VerticalGridProps } from './types';

const VerticalGrid = (props: VerticalGridProps): ReactElement => {
  const { children, title, header } = props;

  return (
    <VStack width='100%' spacing={0}>
      {/* Header */}
      <Header title={title} header={header} />

      {children}
    </VStack>
  );
};

export default VerticalGrid;
