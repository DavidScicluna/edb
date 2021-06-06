import React, { ReactElement } from 'react';

import { VStack, Box } from '@chakra-ui/react';

import { SortBy } from '../../../common/types/types';
import Header from './components/Header';

type VerticalGridProps = {
  children: ReactElement;
  title: string;
  sortBy?: SortBy[];
  onSortChange?: (sortBy: SortBy) => void;
};

const VerticalGrid = (props: VerticalGridProps): ReactElement => {
  const { children, title, sortBy = [], onSortChange } = props;

  return (
    <VStack width='100%' spacing={0}>
      {/* Header */}
      <Header title={title} sortBy={sortBy} onSortChange={onSortChange} />

      {/* Grid */}
      <Box width='100%' px={2} my={0}>
        {children}
      </Box>
    </VStack>
  );
};

export default VerticalGrid;
