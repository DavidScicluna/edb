import { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../common/hooks';
import { PartialTV } from '../../../../common/types/tv';
import { handleReturnDate, handleReturnGenresByID } from '../../../../common/utils';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { VerticalTVProps } from './types';

const VerticalTV = (props: VerticalTVProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 320px)');

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  const { isError = false, isSuccess = false, isLoading = true, tv } = props;

  return !isLoading && isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch TV Shows list!' variant='outlined' />
  ) : !isLoading && isSuccess && tv && tv.length === 0 ? (
    <Empty label='TV Shows list is currently empty!' variant='outlined' />
  ) : !isLoading && isSuccess && tv && tv.length > 0 ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {tv.map((show: PartialTV) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={show.id}
            mediaItem={show ? { ...show } : undefined}
            mediaType='tv'
            image={{
              alt: `${show?.name || ''} tv show poster`,
              src: show?.poster_path || '',
              size: {
                thumbnail: 'w92',
                full: 'original'
              }
            }}
            rating={{
              rating: show?.vote_average || null,
              count: show?.vote_count || null
            }}
            title={show?.name || ''}
            subtitle={`${[
              `${handleReturnDate(show?.first_air_date || '', 'full')}` || 'N/A',
              `${handleReturnGenresByID(show?.genre_ids || [], 'tv')}`
            ]
              .filter((subtitle) => subtitle)
              .join(' • ')}`}
            description={show?.overview || ''}
            isLoading={isLoading}
          />
        ) : (
          <VerticalPoster
            key={show.id}
            width='100%'
            mediaItem={show ? { ...show } : undefined}
            mediaType='tv'
            image={{
              alt: `${show?.name || ''} tv show poster`,
              src: show?.poster_path || '',
              size: {
                thumbnail: 'w92',
                full: 'original'
              }
            }}
            rating={show?.vote_average || null}
            title={show?.name || ''}
            subtitle={`${[
              `${handleReturnDate(show?.first_air_date || '', 'year')}` || 'N/A',
              `${handleReturnGenresByID(show?.genre_ids || [], 'tv')}`
            ]
              .filter((subtitle) => subtitle)
              .join(' • ')}`}
            isLoading={isLoading}
          />
        )
      )}
    </SimpleGrid>
  ) : (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {_.range(0, isSuccess && tv && tv.length > 0 ? tv.length : 20).map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={index}
            mediaType='tv'
            image={{
              alt: 'TV Show poster',
              src: '',
              size: {
                thumbnail: 'w92',
                full: 'original'
              }
            }}
            title='Lorem ipsum'
            subtitle='2021 • Lorem ipsum dolor sit amet'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            isLoading
          />
        ) : (
          <VerticalPoster
            key={index}
            width='100%'
            mediaType='tv'
            title='Lorem ipsum'
            subtitle='2021 • Lorem ipsum dolor sit amet'
            isLoading
          />
        )
      )}
    </SimpleGrid>
  );
};

export default VerticalTV;
