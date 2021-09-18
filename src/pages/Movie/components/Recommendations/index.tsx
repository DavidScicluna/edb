import React, { ReactElement } from 'react';

import arraySort from 'array-sort';
import _ from 'lodash';

import { handleReturnDate } from '../../../../common/utils';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { RecommendationsProps } from './types';

const Recommendations = (props: RecommendationsProps): ReactElement => {
  const { recommendations, name, isError = false, isSuccess = false, isLoading = false } = props;

  return (
    <HorizontalGrid title='Recommended Movies' isLoading={isLoading} hasDivider variant='outlined'>
      {isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} recommended movies list!`}
          variant='transparent'
        />
      ) : isSuccess && recommendations && recommendations.length === 0 ? (
        <Empty label={`No recommended movies found for ${name ? `"${name}"` : ''}`} variant='transparent' />
      ) : isSuccess && recommendations && recommendations.length > 0 ? (
        <>
          {arraySort(recommendations, 'popularity', { reverse: true }).map((movie) => (
            <VerticalPoster
              key={movie.id}
              width={['185px', '205px', '230px']}
              mediaItem={movie ? { ...movie } : undefined}
              mediaType='movie'
              image={{
                alt: `${movie?.title || ''} movie poster`,
                src: movie?.poster_path || '',
                size: {
                  thumbnail: 'w92',
                  full: 'original'
                }
              }}
              rating={{
                rating: movie?.vote_average || null,
                count: movie?.vote_count || null
              }}
              title={movie?.title || ''}
              subtitle={`${handleReturnDate(movie?.release_date || '', 'year')}`}
              isLoading={false}
            />
          ))}
        </>
      ) : (
        <>
          {[..._.range(0, 20)].map((_dummy, index: number) => (
            <VerticalPoster
              key={index}
              width={['185px', '205px', '230px']}
              mediaType='movie'
              title='Lorem ipsum'
              subtitle='Lorem ipsum'
              isLoading
            />
          ))}
        </>
      )}
    </HorizontalGrid>
  );
};

export default Recommendations;
