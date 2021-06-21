import React, { ReactElement } from 'react';

import { useColorMode, HStack, Box } from '@chakra-ui/react';

import { GridProps } from './types';

const Grid = (props: GridProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, gridRef, handleScrollChange } = props;

  return (
    <Box
      ref={gridRef}
      width='100%'
      overflowX='auto'
      px={2}
      sx={{
        // CSS to hide scrollbar
        'scrollbarWidth': 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
      onLoad={(event) => handleScrollChange(event)}
      onScroll={(event) => handleScrollChange(event)}>
      <Box
        width='auto'
        minWidth='100%'
        display='inline-block'
        border='solid2'
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        borderRadius='xl'
        p={2}>
        <HStack spacing={2}>{children}</HStack>
      </Box>
    </Box>
  );
};

export default Grid;
