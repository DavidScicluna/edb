import React, { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, HStack, VStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import axiosInstance from '../../../../common/scripts/axios';
import { MediaType, Response } from '../../../../common/types';
import { PartialPerson } from '../../../../common/types/person';
import Button from '../../../../components/Clickable/Button';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import LoadMore from '../../../../components/Clickable/LoadMore';
import MediaTypePicker from '../../../../components/MediaTypePicker';
import Page from '../../../../containers/Page';
import VerticalPeople from '../../../People/components/VerticalPeople';

const People = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');

  const history = useHistory();

  const [people, setPeople] = useState<Response<PartialPerson[]>>();

  // Fetching trending people
  const trendingPeopleQuery = useInfiniteQuery(
    'trending-people',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/trending/person/week', {
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
          results: [..._.uniqBy(people, 'id')],
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
    <Page title='Trending People'>
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
            <VerticalPeople
              isError={trendingPeopleQuery.isError}
              isSuccess={trendingPeopleQuery.isSuccess}
              isLoading={trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading}
              people={people?.results || []}
            />

            <Box style={{ width: isSm ? '100%' : 'auto' }}>
              <LoadMore
                amount={people?.results.length || 0}
                total={people?.total_results || 0}
                label='Trending People'
                isLoading={trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading}
                isButtonVisible={trendingPeopleQuery.hasNextPage && !trendingPeopleQuery.isError}
                onClick={() => trendingPeopleQuery.fetchNextPage()}
              />
            </Box>
          </VStack>
        )
      }}
    </Page>
  );
};

export default People;
