import React, { ReactElement } from 'react';

import { VStack, Box } from '@chakra-ui/react';

import Header from './components/Header';

type VerticalGridProps = {
  children: ReactElement;
  title: string;
  header: ReactElement;
};

const VerticalGrid = (props: VerticalGridProps): ReactElement => {
  const { children, title, header } = props;

  return (
    <VStack width='100%' spacing={0}>
      {/* Header */}
      <Header title={title} header={header} />

      {/* Grid */}
      <Box width='100%' px={2} my={0}>
        {children}
      </Box>
    </VStack>
  );
};

export default VerticalGrid;
