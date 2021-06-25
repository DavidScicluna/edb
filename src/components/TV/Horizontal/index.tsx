import React, { ReactElement } from 'react';

import useSelector from '../../../common/hooks/useSelectorTyped';
import { PartialTV } from '../../../common/types/tv';
import utils from '../../../common/utils/utils';
import Empty from '../../Empty';
import Error from '../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { TVProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const HorizontalTV = ({ isLoading, isError, isSuccess, tv }: TVProps): ReactElement => {
  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);

  return isLoading && hasOptionsDownloaded ? (
    <>
      {[...Array(tv ? tv.length : 20)].map((_dummy, index: number) => (
        <VerticalPoster
          key={index}
          width='100%'
          mediaType='tv'
          image={{
            alt: 'TV Show poster',
            src: '',
            size
          }}
          title='Lorem ipsum'
          subtitle='Lorem ipsum'
          isLoaded={false}
        />
      ))}
    </>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch TV list!' variant='transparent' />
  ) : isSuccess && tv ? (
    <>
      {tv.map((show: PartialTV, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px']}
          mediaType='tv'
          image={{
            alt: `${show?.name || ''} TV poster`,
            src: show?.poster_path || '',
            size
          }}
          rating={{
            rating: show?.vote_average || null,
            count: show?.vote_count || null
          }}
          title={show?.name || 'N/A'}
          subtitle={`${utils.handleReturnDate(show?.first_air_date || '', 'year')} • ${utils.handleReturnGenresByID(
            show?.genre_ids || [],
            'movie'
          )}`}
          isLoaded={true}
        />
      ))}
    </>
  ) : (
    <Empty label='TV list is currently empty!' variant='transparent' />
  );
};

export default HorizontalTV;
