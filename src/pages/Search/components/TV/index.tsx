import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, SimpleGrid } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { PartialTV } from '../../../../common/types/tv';
import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { TVProps } from './types';

const size = utils.handleReturnImageSize('poster', 'sm');

const TV = ({ tv, isLoading = false }: TVProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return (
    <VStack width='100%' spacing={4} px={2}>
      {isLoading && !hasOptionsDownloaded ? (
        <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
          {[...Array((tv && tv.results.length) || 20)].map((_dummy, index) =>
            displayMode === 'list' ? (
              <HorizontalPoster
                key={index}
                mediaType='tv'
                image={{
                  alt: 'TV show poster',
                  src: '',
                  size
                }}
                rating={{
                  rating: null,
                  count: null
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                description='Lorem ipsum'
                isLoaded={false}
              />
            ) : (
              <VerticalPoster
                key={index}
                width='100%'
                mediaType='tv'
                image={{
                  alt: 'TV show poster',
                  src: '',
                  size
                }}
                rating={{
                  rating: null,
                  count: null
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            )
          )}
        </SimpleGrid>
      ) : (
        <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
          {tv &&
            tv.results.map((show: PartialTV, index: number) =>
              displayMode === 'list' ? (
                <HorizontalPoster
                  key={index}
                  mediaType='tv'
                  image={{
                    alt: `${show?.name || ''} tv show poster`,
                    src: show?.poster_path || '',
                    size
                  }}
                  rating={{
                    rating: show?.vote_average || null,
                    count: show?.vote_count || null
                  }}
                  title={show?.name || ''}
                  subtitle={`${utils.handleReturnDate(
                    show?.first_air_date || '',
                    'full'
                  )} • ${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`}
                  description={show?.overview || ''}
                  isLoaded={true}
                />
              ) : (
                <VerticalPoster
                  key={index}
                  width='100%'
                  mediaType='tv'
                  image={{
                    alt: `${show?.name || ''} tv show poster`,
                    src: show?.poster_path || '',
                    size
                  }}
                  rating={{
                    rating: show?.vote_average || null,
                    count: show?.vote_count || null
                  }}
                  title={show?.name || ''}
                  subtitle={`${utils.handleReturnDate(
                    show?.first_air_date || '',
                    'year'
                  )} • ${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`}
                  isLoaded={true}
                />
              )
            )}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default TV;
