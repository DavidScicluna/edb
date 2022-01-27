import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../../components/Empty';
import Error from '../../../../../../../components/Error';
import VerticalGrid from '../../../../../../../components/Grid/Vertical';
import HorizontalPoster from '../../../../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../../../../components/Poster/Vertical';
import { Collection as CollectionType } from '../../../../../types';
import { VerticalSearchCollectionsProps } from './types';

const VerticalSearchCollections = (props: VerticalSearchCollectionsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { query, collections, collectionsQuery } = props;
  const { isFetching, isLoading, isSuccess, isError } = collectionsQuery;

  return (
    <VStack width='100%' spacing={4}>
      {!(isFetching || isLoading) && isError ? (
        <Error label='Oh no! Something went wrong' description='Failed to fetch collections list!' variant='outlined' />
      ) : !(isFetching || isLoading) && isSuccess && collections?.results && collections.results.length === 0 ? (
        <Empty label='Oh no!' description='Collections list is currently empty!' variant='outlined' />
      ) : !(isFetching || isLoading) && isSuccess && collections?.results && collections.results.length > 0 ? (
        <VerticalGrid>
          {({ displayMode }) =>
            (collections.results || []).map((collection: CollectionType) =>
              displayMode === 'grid' ? (
                <VerticalPoster
                  key={collection.id}
                  mediaItem={collection ? { ...collection } : undefined}
                  mediaType='collection'
                  image={{
                    alt: `${collection.name || ''} collection poster`,
                    src: collection.poster_path || '',
                    size: {
                      thumbnail: 'w92',
                      full: 'original'
                    }
                  }}
                  title={collection.name || ''}
                  subtitle={collection.overview || ''}
                  isLoading={false}
                />
              ) : (
                <HorizontalPoster
                  key={collection.id}
                  mediaItem={collection ? { ...collection } : undefined}
                  mediaType='collection'
                  image={{
                    alt: `${collection.name || ''} collection poster`,
                    src: collection.poster_path || '',
                    size: {
                      thumbnail: 'w92',
                      full: 'original'
                    }
                  }}
                  title={collection.name || ''}
                  description={collection.overview || ''}
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
              isSuccess && collections?.results && collections.results.length > 0 ? collections.results.length : 20
            ).map((_dummy, index: number) =>
              displayMode === 'grid' ? (
                <VerticalPoster
                  key={index}
                  mediaType='collection'
                  image={{
                    alt: 'Collection poster',
                    src: '',
                    size: {
                      thumbnail: 'w92',
                      full: 'original'
                    }
                  }}
                  title='Lorem Ipsum'
                  isLoading={false}
                />
              ) : (
                <HorizontalPoster
                  key={index}
                  mediaType='collection'
                  image={{
                    alt: 'Collection poster',
                    src: '',
                    size: {
                      thumbnail: 'w92',
                      full: 'original'
                    }
                  }}
                  title='Lorem Ipsum'
                  isLoading
                />
              )
            )
          }
        </VerticalGrid>
      )}

      <ScaleFade
        in={collectionsQuery.hasNextPage && !collectionsQuery.isError}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={collections?.results?.length || 0}
          total={collections?.total_results || 0}
          label={`Collections with "${query}"`}
          isLoading={collectionsQuery.isFetching || collectionsQuery.isLoading}
          isButtonVisible={(collectionsQuery.hasNextPage || true) && !collectionsQuery.isError}
          onClick={collectionsQuery.fetchNextPage}
        />
      </ScaleFade>
    </VStack>
  );
};

export default VerticalSearchCollections;
