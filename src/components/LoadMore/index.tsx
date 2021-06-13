import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text, Progress } from '@chakra-ui/react';

import Button from '../Inputs/Button';
import { LoadMoreProps } from './types';

const LoadMore = (props: LoadMoreProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { amount, total, mediaType, isLoading, onFetch } = props;

  return (
    <VStack spacing={3}>
      <VStack max='50%' spacing={1}>
        <Text align='center' fontSize='sm' color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>
          {`You've viewed ${amount} of ${total} ${mediaType}`}
        </Text>
        <Progress
          width='100%'
          color='blue.400'
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius='full'
          size='sm'
          value={(1000 * amount) / total}
        />
      </VStack>

      <Button isLoading={isLoading} onClick={() => onFetch()} variant='outlined'>
        Load more
      </Button>
    </VStack>
  );
};

export default LoadMore;
