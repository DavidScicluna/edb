import React, { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import defaultResponse from '../../common/data/response';
import { movieSortBy } from '../../common/data/sort';
import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialPerson } from '../../common/types/person';
import { Response, SortBy } from '../../common/types/types';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import LoadMore from '../../components/LoadMore';
import VerticalPeople from '../../components/People/Grid/Vertical';

const People = (): ReactElement => {
  const source = axios.CancelToken.source();
  const isMob = useMediaQuery('(max-width: 600px)');

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy | undefined>(movieSortBy.find((sort) => sort.isActive));

  const [people, setPeople] = useState<Response<PartialPerson[]>>(defaultResponse);

  // Fetching people
  const popularPeople = useInfiniteQuery(
    'popularPeople',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/person/popular', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        let people: PartialPerson[] = [];

        data.pages.forEach((page) => {
          people = [...people, ...page.results];
        });

        setPeople({
          page: data.pages[data.pages.length - 1].page,
          results: sort(people, sortBy?.value || '', { reverse: sortDirection === 'desc' }),
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
        return;
      }
    }
  );

  const handleSetFilters = (sortBy: SortBy[]): void => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    popularPeople.refetch();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VerticalGrid title={isMob ? 'People' : ''} header={<Filters mediaType='person' onFilter={handleSetFilters} />}>
      <VStack width='100%' spacing={4} px={2}>
        <VerticalPeople
          isLoading={popularPeople.isLoading || popularPeople.isFetching}
          isError={popularPeople.isError}
          isSuccess={popularPeople.isSuccess}
          people={people.results || []}
        />

        {popularPeople.hasNextPage && people ? (
          <LoadMore
            amount={people.results.length}
            total={people.total_results}
            mediaType='people'
            isLoading={popularPeople.isLoading || popularPeople.isFetching}
            onFetch={popularPeople.fetchNextPage}
          />
        ) : null}
      </VStack>
    </VerticalGrid>
  );
};

export default People;
