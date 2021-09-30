import { ReactElement, useEffect, useState } from 'react';

import { VStack, ScaleFade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { PartialTV } from '../../../../common/types/tv';
import { Response, SortBy, Genre } from '../../../../common/types/types';
import { handleCheckHasFilters, handleReturnColor } from '../../../../common/utils';
import Filters from '../../../../components/Filters';
import VerticalGrid from '../../../../components/Grid/Vertical';
import LoadMore from '../../../../components/LoadMore';
import Page from '../../../../containers/Page';
import { home, tv as tvBreadcrumb } from '../../../../containers/Page/common/data/breadcrumbs';
import { toggleConfirm, defaultConfirmModal } from '../../../../store/slices/Modals';
import VerticalTV from '../../components/VerticalTV';

const TVAiringToday = (): ReactElement => {
  const source = axios.CancelToken.source();

  const dispatch = useDispatch();
  const sortDirection = useSelector((state) => state.app.data.sortDirection);
  const color = useSelector((state) => state.user.ui.theme.color);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [genres, setGenres] = useState<Genre[]>([]);

  const [tv, setTV] = useState<Response<PartialTV[]>>();

  // Fetching tv airing_today
  const tvAiringTodayQuery = useInfiniteQuery(
    'tvAiringToday',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/airing_today', {
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

    tvAiringTodayQuery.refetch();
  };

  const handleResetFilters = (): void => {
    setSortBy(undefined);
    setGenres([]);

    dispatch(toggleConfirm({ ...defaultConfirmModal }));

    setTimeout(() => {
      tvAiringTodayQuery.fetchNextPage();
    }, 0);
  };

  const handleFetchNextPage = (): void => {
    if (handleCheckHasFilters(sortBy, genres)) {
      dispatch(
        toggleConfirm({
          open: true,
          title: 'Filters',
          description: 'Are you sure you want to load more TV shows? Filters will be reset!',
          stringifiedButtonProps: JSON.stringify({
            color: handleReturnColor(color),
            label: 'Load more',
            onClick: () => handleResetFilters()
          })
        })
      );
    } else {
      tvAiringTodayQuery.fetchNextPage();
    }
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page
      title='TV Shows Airing Today'
      breadcrumbs={[home, tvBreadcrumb, { label: 'Airing Today,', to: { pathname: '/tv/airing-today' } }]}>
      {{
        actions: <Filters mediaType='tv' isDisabled={!tvAiringTodayQuery.isSuccess} onFilter={handleSetFilters} />,
        body: (
          <VerticalGrid>
            <VStack width='100%' spacing={4} px={2} pt={2}>
              <VerticalTV
                isError={tvAiringTodayQuery.isError}
                isSuccess={tvAiringTodayQuery.isSuccess}
                isLoading={tvAiringTodayQuery.isFetching || tvAiringTodayQuery.isLoading}
                tv={tv?.results || []}
              />

              <ScaleFade in={!tvAiringTodayQuery.isError} unmountOnExit>
                <LoadMore
                  amount={tv?.results.length || 0}
                  total={tv?.total_results || 0}
                  mediaType='TV shows'
                  isLoading={tvAiringTodayQuery.isFetching || tvAiringTodayQuery.isLoading}
                  isError={tvAiringTodayQuery.isError}
                  hasNextPage={tvAiringTodayQuery.hasNextPage || true}
                  onFetch={handleFetchNextPage}
                />
              </ScaleFade>
            </VStack>
          </VerticalGrid>
        )
      }}
    </Page>
  );
};

export default TVAiringToday;
