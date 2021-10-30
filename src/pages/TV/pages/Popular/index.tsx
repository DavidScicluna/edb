import { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, useDisclosure, VStack, ScaleFade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { PartialTV } from '../../../../common/types/tv';
import { Response, SortBy, Genre } from '../../../../common/types/types';
import { handleCheckHasFilters, handleReturnColor } from '../../../../common/utils';
import Button from '../../../../components/Clickable/Button';
import LoadMore from '../../../../components/Clickable/LoadMore';
import ConfirmModal from '../../../../components/ConfirmModal';
import Filters from '../../../../components/Filters';
import VerticalGrid from '../../../../components/Grid/Vertical';
import Page from '../../../../containers/Page';
import { home, tv as tvBreadcrumb } from '../../../../containers/Page/common/data/breadcrumbs';
import VerticalTV from '../../components/VerticalTV';

const PopularTV = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const sortDirection = useSelector((state) => state.app.data.sortDirection);
  const color = useSelector((state) => state.user.ui.theme.color);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [genres, setGenres] = useState<Genre[]>([]);

  const [tv, setTV] = useState<Response<PartialTV[]>>();

  // Fetching popular tv
  const popularTVQuery = useInfiniteQuery(
    'popularTV',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
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

    popularTVQuery.refetch();
  };

  const handleResetFilters = (): void => {
    setSortBy(undefined);
    setGenres([]);

    onCloseConfirm();

    setTimeout(() => {
      popularTVQuery.fetchNextPage();
    }, 0);
  };

  const handleFetchNextPage = (): void => {
    if (handleCheckHasFilters(sortBy, genres)) {
      onOpenConfirm();
    } else {
      popularTVQuery.fetchNextPage();
    }
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <Page
        title='Popular TV Shows'
        breadcrumbs={[home, tvBreadcrumb, { label: 'Popular', to: { pathname: '/tv/popular' } }]}>
        {{
          actions: <Filters mediaType='tv' isDisabled={!popularTVQuery.isSuccess} onFilter={handleSetFilters} />,
          body: (
            <VerticalGrid>
              <VStack width='100%' spacing={4} px={2} pt={2}>
                <VerticalTV
                  isError={popularTVQuery.isError}
                  isSuccess={popularTVQuery.isSuccess}
                  isLoading={popularTVQuery.isFetching || popularTVQuery.isLoading}
                  tv={tv?.results || []}
                />

                <ScaleFade in={!popularTVQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
                  <LoadMore
                    amount={tv?.results.length || 0}
                    total={tv?.total_results || 0}
                    label='TV Shows'
                    isLoading={popularTVQuery.isFetching || popularTVQuery.isLoading}
                    isButtonVisible={(popularTVQuery.hasNextPage || true) && !popularTVQuery.isError}
                    onClick={handleFetchNextPage}
                  />
                </ScaleFade>
              </VStack>
            </VerticalGrid>
          )
        }}
      </Page>

      <ConfirmModal
        renderButton={
          <Button color={handleReturnColor(color)} onClick={() => handleResetFilters()} size='sm'>
            Load more
          </Button>
        }
        title='Filters'
        description='Are you sure you want to load more TV shows? Filters will be reset!'
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
      />
    </>
  );
};

export default PopularTV;
