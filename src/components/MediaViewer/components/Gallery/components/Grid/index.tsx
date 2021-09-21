import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, SimpleGrid, Text } from '@chakra-ui/react';

import { GridProps } from './types';

const Grid = ({ children, title }: GridProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSmallMob] = useMediaQuery('(max-width: 340px)');

  return (
    <VStack width='100%' justifyContent='stretch' spacing={2}>
      <Text
        width='100%'
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='xl'
        fontWeight='semibold'>
        {title}
      </Text>

      <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 5, 6]} spacing={2}>
        {children}
      </SimpleGrid>
    </VStack>
  );
};

export default Grid;
