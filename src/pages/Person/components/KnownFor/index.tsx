import { ReactElement } from 'react';

import _ from 'lodash';

import { handleReturnDate } from '../../../../common/utils';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { KnownForProps } from './types';

const KnownFor = (props: KnownForProps): ReactElement => {
  const { knownFor, name, isError = false, isSuccess = false, isLoading = false } = props;

  return (
    <HorizontalGrid title='Known for' isLoading={isLoading} hasDivider variant='outlined'>
      {isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} known for list!`}
          variant='transparent'
        />
      ) : isSuccess && knownFor && knownFor.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} has no known for credits`} variant='transparent' />
      ) : isSuccess && knownFor && knownFor.length > 0 ? (
        <>
          {knownFor.map((mediaItem) => (
            <VerticalPoster
              key={mediaItem.id}
              width={['185px', '205px', '230px']}
              mediaItem={mediaItem ? { ...mediaItem } : undefined}
              mediaType={mediaItem?.title ? 'movie' : 'tv'}
              image={{
                alt: `${mediaItem?.title || mediaItem?.name || ''} ${mediaItem?.title ? 'movie' : 'tv'} poster`,
                src: mediaItem?.poster_path || '',
                size: {
                  thumbnail: 'w92',
                  full: 'original'
                }
              }}
              rating={mediaItem?.vote_average || null}
              title={mediaItem?.title || mediaItem?.name || ''}
              subtitle={
                `${handleReturnDate(mediaItem?.release_date || mediaItem?.first_air_date || '', 'year')}` || 'N/A'
              }
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

export default KnownFor;
