import React, { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';
import ReportProblemTwoToneIcon from '@material-ui/icons/ReportProblemTwoTone';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import useSelector from '../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../common/scripts/axios';
import { PartialTV } from '../../../common/types/tv';
import { Response, SortBy, Genre } from '../../../common/types/types';
import utils from '../../../common/utils/utils';
import Button from '../../../components/Clickable/Button';
import Filters from '../../../components/Filters';
import VerticalGrid from '../../../components/Grid/Vertical';
import LoadMore from '../../../components/LoadMore';
import VerticalTV from '../../../components/TV/Grid/Vertical';
import { toggleConfirm, defaultConfirmModal } from '../../../store/slices/Modals';

const TopRatedTV = (): ReactElement => {
  const source = axios.CancelToken.source();
  const isMob = useMediaQuery('(max-width: 640px)');

  const dispatch = useDispatch();
  const sortDirection = useSelector((state) => state.app.data.sortDirection);
  const color = useSelector((state) => state.user.ui.theme.color);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [genres, setGenres] = useState<Genre[]>([]);

  const [tv, setTV] = useState<Response<PartialTV[]>>();

  // Fetching top rated tv
  const topRatedTV = useInfiniteQuery(
    'topRatedTV',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/top_rated', {
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

    topRatedTV.refetch();
  };

  const handleResetFilters = (): void => {
    setSortBy(undefined);
    setGenres([]);

    dispatch(toggleConfirm({ ...defaultConfirmModal }));

    setTimeout(() => {
      topRatedTV.fetchNextPage();
    }, 0);
  };

  const handleFetchNextPage = (): void => {
    if (utils.handleCheckHasFilters(sortBy, genres)) {
      dispatch(
        toggleConfirm({
          open: true,
          icon: ReportProblemTwoToneIcon,
          title: 'Filters',
          description: 'Are you sure you want to load more TV shows? Filters will be reset!',
          submitButton: (
            <Button color={utils.handleReturnColor(color)} onClick={() => handleResetFilters()} size='xs'>
              Load more
            </Button>
          )
        })
      );
    } else {
      topRatedTV.fetchNextPage();
    }
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VerticalGrid
      title={isMob ? 'Top Rated TV Shows' : ''}
      header={<Filters mediaType='tv' onFilter={handleSetFilters} />}>
      <VStack width='100%' spacing={4} px={2}>
        <VerticalTV
          isError={topRatedTV.isError}
          isSuccess={topRatedTV.isSuccess && !topRatedTV.isFetching && !topRatedTV.isLoading}
          tv={tv?.results || []}
        />

        {tv ? (
          <LoadMore
            amount={tv.results.length}
            total={tv.total_results}
            mediaType='TV shows'
            isLoading={topRatedTV.isFetching || topRatedTV.isLoading}
            hasNextPage={topRatedTV.hasNextPage || true}
            onFetch={handleFetchNextPage}
          />
        ) : null}
      </VStack>
    </VerticalGrid>
  );
};

export default TopRatedTV;
