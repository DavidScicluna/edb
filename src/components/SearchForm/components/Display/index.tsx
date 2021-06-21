import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

type DisplayProps = {
  query: string;
  totalResults?: number;
};

const Display = ({ query = '', totalResults = 0 }: DisplayProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <HStack width='100%' justifyContent='space-between'>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        fontSize='sm'>{`Your search results for "${query}"`}</Text>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='sm'>{`${totalResults} result${totalResults > 1 ? 's' : ''} found`}</Text>
    </HStack>
  );
};

export default Display;
