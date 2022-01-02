import { ReactElement } from 'react';

import sort from 'array-sort';
import _ from 'lodash';

import { handleReturnDate } from '../../../../../../../common/utils';
import Empty from '../../../../../../../components/Empty';
import Error from '../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../../../../components/Poster/Vertical';
import { RecommendationsProps } from './types';

const Recommendations = (props: RecommendationsProps): ReactElement => {
  const { recommendations, name, isError = false, isSuccess = false, isLoading = false } = props;

  return (
    <HorizontalGrid title='Recommended TV Shows' isLoading={isLoading} hasDivider variant='outlined'>
      {isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} recommended tv show list!`}
          variant='transparent'
        />
      ) : isSuccess && recommendations && recommendations.length === 0 ? (
        <Empty label={`No recommended tv shows found for ${name ? `"${name}"` : ''}`} variant='transparent' />
      ) : isSuccess && recommendations && recommendations.length > 0 ? (
        <>
          {sort(recommendations, 'popularity', { reverse: true }).map((show) => (
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
              rating={show?.vote_average || null}
              title={show?.name || ''}
              subtitle={`${handleReturnDate(show?.first_air_date || '', 'year')}` || 'N/A'}
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
              mediaType='tv'
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
