import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../../common/hooks';
import { Company } from '../../../../../../../common/types';
import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../../components/Empty';
import Error from '../../../../../../../components/Error';
import VerticalGrid from '../../../../../../../components/Grid/Vertical';
import HorizontalPoster from '../../../../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../../../../components/Poster/Vertical';
import { VerticalSearchCompaniesProps } from './types';

const VerticalSearchCompanies = (props: VerticalSearchCompaniesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const countries = useSelector((state) => state.options.data.countries);

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
            (companies.results || []).map((company: Company) =>
              displayMode === 'grid' ? (
                <VerticalPoster
                  key={company.id}
                  mediaItem={company ? { ...company } : undefined}
                  mediaType='company'
                  image={{
                    alt: `${company.name || ''} company poster`,
                    src: company.logo_path || '',
                    size: {
                      thumbnail: 'w45',
                      full: 'original'
                    }
                  }}
                  title={company.name || ''}
                  subtitle={
                    countries.find((country) => country.iso_3166_1 === company.origin_country)?.english_name || ''
                  }
                  isLoading={false}
                />
              ) : (
                <HorizontalPoster
                  key={company.id}
                  mediaItem={company ? { ...company } : undefined}
                  mediaType='company'
                  image={{
                    alt: `${company.name || ''} company poster`,
                    src: company.logo_path || '',
                    size: {
                      thumbnail: 'w45',
                      full: 'original'
                    }
                  }}
                  title={company.name || ''}
                  subtitle={
                    countries.find((country) => country.iso_3166_1 === company.origin_country)?.english_name || ''
                  }
                  isLoading={false}
                />
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
                <VerticalPoster
                  key={index}
                  mediaType='company'
                  image={{
                    alt: 'Company poster',
                    src: '',
                    size: {
                      thumbnail: 'w45',
                      full: 'original'
                    }
                  }}
                  title='Lorem Ipsum'
                  subtitle='Lorem'
                  isLoading
                />
              ) : (
                <HorizontalPoster
                  key={index}
                  mediaType='company'
                  image={{
                    alt: 'Company poster',
                    src: '',
                    size: {
                      thumbnail: 'w45',
                      full: 'original'
                    }
                  }}
                  title='Lorem Ipsum'
                  subtitle='Lorem'
                  isLoading
                />
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
