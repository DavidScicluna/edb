import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text, Progress } from '@chakra-ui/react';

import useSelector from '../../common/hooks/useSelectorTyped';
import utils from '../../common/utils/utils';
import Button from '../Inputs/Button';
import { LoadMoreProps } from './types';

const LoadMore = (props: LoadMoreProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { amount, total, mediaType, isLoading, onFetch } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  console.log(`${utils.handleReturnColor(color)}.400`);

  return (
    <VStack spacing={3}>
      <VStack max='50%' spacing={1}>
        <Text align='center' fontSize='sm' color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>
          {amount >= total
            ? `You've viewed all ${total} ${mediaType}`
            : `You've viewed ${amount} of ${total} ${mediaType}`}
        </Text>
        <Progress
          width='100%'
          colorScheme={utils.handleReturnColor(color)}
          background={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius='full'
          size='sm'
          value={Math.round((amount / total) * 100)}
        />
      </VStack>

      <Button isDisabled={amount >= total} isLoading={isLoading} onClick={() => onFetch()} variant='outlined'>
        Load more
      </Button>
    </VStack>
  );
};

export default LoadMore;
