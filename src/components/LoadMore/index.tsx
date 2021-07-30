import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text, Progress, ScaleFade } from '@chakra-ui/react';

import useSelector from '../../common/hooks/useSelectorTyped';
import utils from '../../common/utils/utils';
import Button from '../Clickable/Button';
import { LoadMoreProps } from './types';

const LoadMore = (props: LoadMoreProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { amount = 0, total = 0, mediaType, isLoading = false, isError = false, hasNextPage = true, onFetch } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

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
          background={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius='full'
          size='sm'
          value={Math.round((amount / total) * 100)}
          sx={{ '& div': { backgroundColor: `${utils.handleReturnColor(color)}.400` } }}
        />
      </VStack>

      <ScaleFade in={hasNextPage && !isError && amount < total} unmountOnExit>
        <Button isDisabled={amount >= total} isLoading={isLoading} onClick={() => onFetch()} variant='outlined'>
          Load more
        </Button>
      </ScaleFade>
    </VStack>
  );
};

export default LoadMore;
