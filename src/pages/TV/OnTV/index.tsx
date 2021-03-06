import React, { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';

import defaultResponse from '../../../common/data/response';
import { tvSortBy } from '../../../common/data/sort';
import useSelector from '../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../common/scripts/axios';
import { PartialTV } from '../../../common/types/tv';
import { Response, SortBy, Genre } from '../../../common/types/types';
import Filters from '../../../components/Filters';
import VerticalGrid from '../../../components/Grid/Vertical';
import LoadMore from '../../../components/LoadMore';
import VerticalTV from '../../../components/TV/Grid/Vertical';

const OnTV = (): ReactElement => {
  const source = axios.CancelToken.source();
  const isMob = useMediaQuery('(max-width: 600px)');

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy | undefined>(tvSortBy.find((sort) => sort.isActive));
  const [genres, setGenres] = useState<Genre[]>([]);

  const [tv, setTV] = useState<Response<PartialTV[]>>(defaultResponse);

  // Fetching on tv
  const onTV = useInfiniteQuery(
    'onTV',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/on_the_air', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        let tv: PartialTV[] = [];

        data.pages.forEach((page) => {
          tv = [...tv, ...page.results];
        });

        setTV({
          page: data.pages[data.pages.length - 1].page,
          results: sort(
            genres && genres.length > 0
              ? tv.filter((show) => genres.some((genre) => _.includes(show.genre_ids, genre.id)))
              : [...tv],
            sortBy?.value || '',
            { reverse: sortDirection === 'desc' }
          ),
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
        return;
      }
    }
  );

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[]): void => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    setGenres(genres);

    onTV.refetch();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VerticalGrid
      title={isMob ? 'TV Shows On At The Moment' : ''}
      header={<Filters mediaType='tv' onFilter={handleSetFilters} />}>
      <VStack width='100%' spacing={4} px={2}>
        <VerticalTV
          isLoading={onTV.isLoading || onTV.isFetching}
          isError={onTV.isError}
          isSuccess={onTV.isSuccess}
          tv={tv.results || []}
        />

        {onTV.hasNextPage && tv ? (
          <LoadMore
            amount={tv.results.length}
            total={tv.total_results}
            mediaType='TV shows'
            isLoading={onTV.isLoading || onTV.isFetching}
            onFetch={onTV.fetchNextPage}
          />
        ) : null}
      </VStack>
    </VerticalGrid>
  );
};

export default OnTV;
