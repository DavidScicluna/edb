import { ReactElement } from 'react';

import { useMediaQuery, VStack, Box } from '@chakra-ui/react';


import { PeopleProps } from './types';

import LoadMore from '../../../../components/Clickable/LoadMore';
import VerticalPeople from '../../../People/components/Orientation/Vertical';

const People = ({ people, query }: PeopleProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <VStack width='100%' spacing={4}>
      <VerticalPeople
        isError={query.isError}
        isSuccess={query.isSuccess}
        isLoading={query.isFetching || query.isLoading}
        people={people?.results || []}
      />

      <Box style={{ width: isSm ? '100%' : 'auto' }}>
        <LoadMore
          amount={people?.results?.length || 0}
          total={people?.total_results || 0}
          label='Trending People'
          isLoading={query.isFetching || query.isLoading}
          isButtonVisible={query.hasNextPage && !query.isError}
          onClick={() => query.fetchNextPage()}
        />
      </Box>
    </VStack>
  );
};

export default People;
