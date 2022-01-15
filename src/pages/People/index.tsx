import { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialPerson } from '../../common/types/person';
import DisplayMode from '../../components/Clickable/DisplayMode';
import LoadMore from '../../components/Clickable/LoadMore';
import Page from '../../containers/Page';
import VerticalPeople from './components/Orientation/Vertical';

const People = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [people, setPeople] = useState<Response<PartialPerson[]>>();

  // Fetching People
  const peopleQuery = useInfiniteQuery(
    'people',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/person/popular', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
      onSuccess: (data) => {
        let people: PartialPerson[] = [];

        data.pages.forEach((page) => {
          people = [...people, ...(page?.results || [])];
        });

        setPeople({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(people, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });

        return;
      }
    }
  );

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='People'>
      {{
        actions: <DisplayMode />,
        body: (
          <VStack width='100%' spacing={4} px={2} pt={2}>
            <VerticalPeople
              isError={peopleQuery.isError}
              isSuccess={peopleQuery.isSuccess}
              isLoading={peopleQuery.isFetching || peopleQuery.isLoading}
              people={people?.results || []}
            />

            <ScaleFade in={!peopleQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
              <LoadMore
                amount={people?.results?.length || 0}
                total={people?.total_results || 0}
                label='People'
                isLoading={peopleQuery.isFetching || peopleQuery.isLoading}
                isButtonVisible={(peopleQuery.hasNextPage || true) && !peopleQuery.isError}
                onClick={peopleQuery.fetchNextPage}
              />
            </ScaleFade>
          </VStack>
        )
      }}
    </Page>
  );
};

export default People;
