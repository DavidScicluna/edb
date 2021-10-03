import { ReactElement, useEffect, useState } from 'react';

import { useDisclosure, VStack, ScaleFade } from '@chakra-ui/react';
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

const OnTV = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const sortDirection = useSelector((state) => state.app.data.sortDirection);
  const color = useSelector((state) => state.user.ui.theme.color);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [genres, setGenres] = useState<Genre[]>([]);

  const [tv, setTV] = useState<Response<PartialTV[]>>();

  // Fetching on tv
  const onTVQuery = useInfiniteQuery(
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

    onTVQuery.refetch();
  };

  const handleResetFilters = (): void => {
    setSortBy(undefined);
    setGenres([]);

    onCloseConfirm();

    setTimeout(() => {
      onTVQuery.fetchNextPage();
    }, 0);
  };

  const handleFetchNextPage = (): void => {
    if (handleCheckHasFilters(sortBy, genres)) {
      onOpenConfirm();
    } else {
      onTVQuery.fetchNextPage();
    }
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <Page
        title='TV Shows On At The Moment'
        breadcrumbs={[home, tvBreadcrumb, { label: 'On At The Moment', to: { pathname: '/tv/on-tv' } }]}>
        {{
          actions: <Filters mediaType='tv' isDisabled={!onTVQuery.isSuccess} onFilter={handleSetFilters} />,
          body: (
            <VerticalGrid>
              <VStack width='100%' spacing={4} px={2} pt={2}>
                <VerticalTV
                  isError={onTVQuery.isError}
                  isSuccess={onTVQuery.isSuccess}
                  isLoading={onTVQuery.isFetching || onTVQuery.isLoading}
                  tv={tv?.results || []}
                />

                <ScaleFade in={!onTVQuery.isError} unmountOnExit>
                  <LoadMore
                    amount={tv?.results.length || 0}
                    total={tv?.total_results || 0}
                    mediaType='TV shows'
                    isLoading={onTVQuery.isFetching || onTVQuery.isLoading}
                    isError={onTVQuery.isError}
                    hasNextPage={onTVQuery.hasNextPage || true}
                    onFetch={handleFetchNextPage}
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

export default OnTV;
