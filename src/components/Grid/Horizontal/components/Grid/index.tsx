import React, { ReactElement, Ref } from 'react';

import { useColorMode, HStack, Box } from '@chakra-ui/react';

type GridProps = {
  children: ReactElement;
  gridRef: Ref<HTMLDivElement> | undefined;
  handleScrollChange: (event: any) => void;
};

const Grid = (props: GridProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, gridRef = undefined, handleScrollChange } = props;

  return (
    <Box
      ref={gridRef}
      overflowX='auto'
      px={2}
      sx={{
        // CSS to hide scrollbar
        'scrollbarWidth': 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
      onScroll={(event) => handleScrollChange(event)}>
      <Box
        width='max-content'
        display='inline-block'
        border='solid2'
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        borderRadius='lg'
        p={2}>
        <HStack width='max-content' spacing={2}>
          {children}
        </HStack>
      </Box>
    </Box>
  );
};

export default Grid;
