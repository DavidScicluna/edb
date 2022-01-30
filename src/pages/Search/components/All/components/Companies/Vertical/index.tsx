import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import { PartialCompany } from '../../../../../../../common/types';
import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../../components/Empty';
import Error from '../../../../../../../components/Error';
import VerticalGrid from '../../../../../../../components/Grid/Vertical';
import HorizontalCompanyPoster from '../components/Poster/Horizontal';
import VerticalCompanyPoster from '../components/Poster/Vertical';
import { VerticalSearchCompaniesProps } from './types';

const VerticalSearchCompanies = (props: VerticalSearchCompaniesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { query, companies, companiesQuery } = props;
  const { isFetching, isLoading, isSuccess, isError } = companiesQuery;

  return (
    <VStack width='100%' spacing={4}>
      {!(isFetching || isLoading) && isError ? (
        <Error label='Oh no! Something went wrong' description='Failed to fetch companies list!' variant='outlined' />
      ) : !(isFetching || isLoading) && isSuccess && companies?.results && companies.results.length === 0 ? (
        <Empty label='Oh no!' description='Companies list is currently empty!' variant='outlined' />
      ) : !(isFetching || isLoading) && isSuccess && companies?.results && companies.results.length > 0 ? (
        <VerticalGrid>
          {({ displayMode }) =>
            (companies.results || []).map((company: PartialCompany) =>
              displayMode === 'grid' ? (
                <VerticalCompanyPoster key={company.id} company={company} isLoading={false} />
              ) : (
                <HorizontalCompanyPoster key={company.id} company={company} isLoading={false} />
              )
            )
          }
        </VerticalGrid>
      ) : (
        <VerticalGrid displayMode='grid'>
          {({ displayMode }) =>
            _.range(
              0,
              isSuccess && companies?.results && companies.results.length > 0 ? companies.results.length : 20
            ).map((_dummy, index: number) =>
              displayMode === 'grid' ? (
                <VerticalCompanyPoster key={index} isLoading />
              ) : (
                <HorizontalCompanyPoster key={index} isLoading />
              )
            )
          }
        </VerticalGrid>
      )}

      <ScaleFade
        in={companiesQuery.hasNextPage && !companiesQuery.isError}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={companies?.results?.length || 0}
          total={companies?.total_results || 0}
          label={`Companies with "${query}"`}
          isLoading={companiesQuery.isFetching || companiesQuery.isLoading}
          isButtonVisible={(companiesQuery.hasNextPage || true) && !companiesQuery.isError}
          onClick={companiesQuery.fetchNextPage}
        />
      </ScaleFade>
    </VStack>
  );
};

export default VerticalSearchCompanies;
