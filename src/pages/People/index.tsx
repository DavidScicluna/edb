import React, { ReactElement, useEffect, useState } from 'react';

import { VStack } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import { Department } from '../../common/data/departments';
import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialPerson } from '../../common/types/person';
import { Response, SortBy } from '../../common/types/types';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import LoadMore from '../../components/LoadMore';
import VerticalPeople from '../../components/People/Grid/Vertical';
import Page from '../../containers/Page';
import { home, people as peopleBreadcrumb } from '../../containers/Page/common/data/breadcrumbs';

const People = (): ReactElement => {
  const source = axios.CancelToken.source();

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [departments, setDepartments] = useState<Department[]>([]);

  const [people, setPeople] = useState<Response<PartialPerson[]>>();

  // Fetching people
  const popularPeople = useInfiniteQuery(
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

    popularPeople.refetch();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='People' breadcrumbs={[home, peopleBreadcrumb]}>
      {{
        actions: <Filters mediaType='person' isDisabled={!popularPeople.isSuccess} onFilter={handleSetFilters} />,
        body: (
          <VerticalGrid>
            <VStack width='100%' spacing={4} px={2} pt={2}>
              <VerticalPeople
                isError={popularPeople.isError}
                isSuccess={popularPeople.isSuccess && !popularPeople.isFetching && !popularPeople.isLoading}
                people={people?.results || []}
              />

              {people ? (
                <LoadMore
                  amount={people.results.length}
                  total={people.total_results}
                  mediaType='people'
                  isLoading={popularPeople.isFetching || popularPeople.isLoading}
                  isError={popularPeople.isError}
                  hasNextPage={popularPeople.hasNextPage || true}
                  onFetch={popularPeople.fetchNextPage}
                />
              ) : null}
            </VStack>
          </VerticalGrid>
        )
      }}
    </Page>
  );
};

export default People;
