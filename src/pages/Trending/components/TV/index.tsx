import { ReactElement } from 'react';

import { useMediaQuery, VStack, Box } from '@chakra-ui/react';

import LoadMore from '../../../../components/Clickable/LoadMore';
import VerticalTV from '../../../TV/components/Orientation/Vertical';
import { TVProps } from './types';

const TV = ({ shows, query }: TVProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <VStack width='100%' spacing={4}>
      <VerticalTV
        isError={query.isError}
        isSuccess={query.isSuccess}
        isLoading={query.isFetching || query.isLoading}
        shows={shows?.results || []}
      />

      <Box style={{ width: isSm ? '100%' : 'auto' }}>
        <LoadMore
          amount={shows?.results?.length || 0}
          total={shows?.total_results || 0}
          label='Trending TV Shows'
          isLoading={query.isFetching || query.isLoading}
          isButtonVisible={query.hasNextPage && !query.isError}
          onClick={() => query.fetchNextPage()}
        />
      </Box>
    </VStack>
  );
};

export default TV;
