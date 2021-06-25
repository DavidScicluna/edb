import React, { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, SimpleGrid, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import { MovieTVSortBy } from '../../../common/data/sort';
import useSelector from '../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../common/scripts/axios';
import { onSortChange } from '../../../common/scripts/sortBy';
import { PartialMovie } from '../../../common/types/movie';
import { Response, SortBy } from '../../../common/types/types';
import utils from '../../../common/utils/utils';
import DisplayOptions from '../../../components/DisplayOptions';
import Empty from '../../../components/Empty';
import Error from '../../../components/Error';
import VerticalGrid from '../../../components/Grid/Vertical';
import LoadMore from '../../../components/LoadMore';
import VerticalMovies from '../../../components/Movies/Vertical';

const PopularMovies = (): ReactElement => {
  const source = axios.CancelToken.source();
  const [isSmallMob, isMob] = useMediaQuery(['(max-width: 350px)', '(max-width: 600px)']);

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy[]>(MovieTVSortBy);

  const [movies, setMovies] = useState<PartialMovie[]>([]);

  const size = utils.handleReturnImageSize('poster', 'sm');

  // Fetching popular movies
  const popularMovies = useInfiniteQuery(
    ['popularMovies', sortBy],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
        params: { page: pageParam, sort_by: `${sortBy.find((sort) => sort.isActive)?.value}.${sortDirection}` },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false)
    }
  );

  const handleSortChange = (paramSort: SortBy): void => {
    setSortBy(onSortChange(paramSort, sortBy));
  };

  useEffect(() => {
    popularMovies.refetch();
  }, [sortDirection]);

  useEffect(() => {
    if (popularMovies.isSuccess && popularMovies.data && popularMovies.data.pages) {
      let movies: PartialMovie[] = [];

      popularMovies.data.pages.forEach((page) => {
        movies = [...movies, ...page.results];
      });

      setMovies([...movies]);
    }
  }, [popularMovies.dataUpdatedAt]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VerticalGrid
      title={isMob ? 'Popular Movies' : ''}
      header={<DisplayOptions sortBy={sortBy} onSortChange={handleSortChange} />}>
      <VStack width='100%' spacing={4} px={2}>
        <VerticalMovies
          isLoading={popularMovies.isLoading || popularMovies.isFetching}
          isError={popularMovies.isError}
          isSuccess={popularMovies.isSuccess}
          movies={movies?.results}
        />

          <LoadMore
            amount={popularMovies.data.pages[popularMovies.data.pages.length - 1].page * 20}
            total={popularMovies.data.pages[popularMovies.data.pages.length - 1].total_results}
            mediaType='popular movies'
            isLoading={popularMovies.isLoading || popularMovies.isFetching}
            onFetch={popularMovies.fetchNextPage}
          />
        ) : null}
      </VStack>
    </VerticalGrid>
  );
};

export default PopularMovies;
