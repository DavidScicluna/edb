import React, { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, HStack, VStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import axiosInstance from '../../../../common/scripts/axios';
import { MediaType, Response } from '../../../../common/types';
import { PartialTV } from '../../../../common/types/tv';
import Button from '../../../../components/Clickable/Button';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import LoadMore from '../../../../components/Clickable/LoadMore';
import MediaTypePicker from '../../../../components/MediaTypePicker';
import Page from '../../../../containers/Page';
import VerticalTV from '../../../TV/components/Orientation/Vertical';

const TV = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');

  const history = useHistory();

  const [tvShows, setTVShows] = useState<Response<PartialTV[]>>();

  // Fetchingtrending tv shows
  const trendingTVQuery = useInfiniteQuery(
    'trending-tv-shows',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        let tvShows: PartialTV[] = [];

        data.pages.forEach((page) => {
          tvShows = [...tvShows, ...page.results];
        });

        setTVShows({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(tvShows, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
      }
    }
  );

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='Trending TV Shows'>
      {{
        actions: (
          <HStack spacing={2}>
            <MediaTypePicker
              renderToggleModal={({ color, label, icon, onClick }) => (
                <Button color={color} isFullWidth={isSm} onClick={() => onClick()} variant='outlined'>
                  {label}
                </Button>
              )}
              mediaType='person'
              onSetType={(mediaType: MediaType) => history.push({ pathname: `/trending/${mediaType}` })}
            />
            <DisplayMode />
          </HStack>
        ),
        body: (
          <VStack width='100%' spacing={4} px={2} pt={2}>
            <VerticalTV
              isError={trendingTVQuery.isError}
              isSuccess={trendingTVQuery.isSuccess}
              isLoading={trendingTVQuery.isFetching || trendingTVQuery.isLoading}
              shows={tvShows?.results || []}
            />

            <Box style={{ width: isSm ? '100%' : 'auto' }}>
              <LoadMore
                amount={tvShows?.results.length || 0}
                total={tvShows?.total_results || 0}
                label='Trending TV Shows'
                isLoading={trendingTVQuery.isFetching || trendingTVQuery.isLoading}
                isButtonVisible={trendingTVQuery.hasNextPage && !trendingTVQuery.isError}
                onClick={() => trendingTVQuery.fetchNextPage()}
              />
            </Box>
          </VStack>
        )
      }}
    </Page>
  );
};

export default TV;
