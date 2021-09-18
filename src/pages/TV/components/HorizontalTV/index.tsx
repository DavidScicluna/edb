import React, { ReactElement } from 'react';

import _ from 'lodash';

import { PartialTV } from '../../../../common/types/tv';
import { handleReturnDate, handleReturnGenresByID } from '../../../../common/utils';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { HorizontalTVProps } from './types';

const HorizontalTV = (props: HorizontalTVProps): ReactElement => {
  const { isError = false, isSuccess = false, isLoading = true, tv } = props;

  return !isLoading && isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch TV Shows list!' variant='transparent' />
  ) : !isLoading && isSuccess && tv && tv.length === 0 ? (
    <Empty label='TV Shows list is currently empty!' variant='transparent' />
  ) : !isLoading && isSuccess && tv && tv.length > 0 ? (
    <>
      {tv.map((show: PartialTV) => (
        <VerticalPoster
          key={show.id}
          width={['185px', '205px', '230px']}
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
            `${handleReturnDate(show?.first_air_date || '', 'year')}`,
            `${handleReturnGenresByID(show?.genre_ids || [], 'tv')}`
          ]
            .filter((subtitle) => subtitle)
            .join(' • ')}`}
          isLoading={isLoading}
        />
      ))}
    </>
  ) : (
    <>
      {_.range(0, 20).map((_dummy, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px', '205px', '230px']}
          mediaType='tv'
          title='Lorem ipsum'
          subtitle='2021 • Lorem ipsum dolor sit amet'
          isLoading
        />
      ))}
    </>
  );
};

export default HorizontalTV;
