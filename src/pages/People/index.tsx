import { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import { Department } from '../../common/data/departments';
import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { PartialPerson } from '../../common/types/person';
import { Response, SortBy } from '../../common/types/types';
import LoadMore from '../../components/Clickable/LoadMore';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import Page from '../../containers/Page';
import { home, people as peopleBreadcrumb } from '../../containers/Page/common/data/breadcrumbs';
import VerticalPeople from './components/VerticalPeople';

const People = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [departments, setDepartments] = useState<Department[]>([]);

  const [people, setPeople] = useState<Response<PartialPerson[]>>();

  // Fetching people
  const popularPeopleQuery = useInfiniteQuery(
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
          results: sort(
            departments && departments.length > 0
              ? people.filter((person) =>
                  departments.some((department) => person.known_for_department === department.value)
                )
              : [...people],
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

  const handleSetFilters = (sortBy: SortBy[], _genres: unknown[], departments: Department[]): void => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    setDepartments(departments);

    popularPeopleQuery.refetch();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='People' breadcrumbs={[home, peopleBreadcrumb]}>
      {{
        actions: <Filters mediaType='person' isDisabled={!popularPeopleQuery.isSuccess} onFilter={handleSetFilters} />,
        body: (
          <VerticalGrid>
            <VStack width='100%' spacing={4} px={2} pt={2}>
              <VerticalPeople
                isError={popularPeopleQuery.isError}
                isSuccess={popularPeopleQuery.isSuccess}
                isLoading={popularPeopleQuery.isFetching || popularPeopleQuery.isLoading}
                people={people?.results || []}
              />

              <ScaleFade in={!popularPeopleQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
                <LoadMore
                  amount={people?.results.length || 0}
                  total={people?.total_results || 0}
                  label='People'
                  isLoading={popularPeopleQuery.isFetching || popularPeopleQuery.isLoading}
                  isButtonVisible={(popularPeopleQuery.hasNextPage || true) && !popularPeopleQuery.isError}
                  onClick={popularPeopleQuery.fetchNextPage}
                />
              </ScaleFade>
            </VStack>
          </VerticalGrid>
        )
      }}
    </Page>
  );
};

export default People;
