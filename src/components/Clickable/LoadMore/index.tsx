import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Text, Progress, ScaleFade } from '@chakra-ui/react';

import { useSelector } from '../../../common/hooks';
import { handleReturnColor } from '../../../common/utils';
import Button from '../Button';
import { LoadMoreProps } from './types';

const LoadMore = (props: LoadMoreProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { amount = 0, total = 0, label, isLoading = false, isButtonVisible = true, onClick } = props;

  return (
    <VStack width={isSm ? '100%' : 'auto'} spacing={3}>
      <VStack width='100%'>
        <Text align='center' fontSize='sm' color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>
          {amount >= total ? `You've viewed all ${total} ${label}` : `You've viewed ${amount} of ${total} ${label}`}
        </Text>
        <Progress
          width='100%'
          background={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius='full'
          size='sm'
          value={Math.round((amount / total) * 100)}
          sx={{ '& div': { backgroundColor: `${handleReturnColor(color)}.400` } }}
        />
      </VStack>

      <ScaleFade in={isButtonVisible && amount < total} unmountOnExit style={{ width: '100%' }}>
        <Button
          color={handleReturnColor(color)}
          isDisabled={amount >= total}
          isLoading={isLoading}
          isFullWidth
          onClick={() => onClick()}
          variant='outlined'>
          Load more
        </Button>
      </ScaleFade>
    </VStack>
  );
};

export default LoadMore;
