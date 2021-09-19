import React, { ReactElement } from 'react';

import { handleReturnDate } from '../../../../../../common/utils';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import { CollectionProps } from './types';

const Collection = (props: CollectionProps): ReactElement => {
  const { name, parts } = props;

  const handleTitle = (): string => {
    const nameSplit = name.split(' ');

    return nameSplit.filter((string) => string.toLowerCase() !== 'collection').join(' ');
  };

  return (
    <HorizontalGrid title={`Part of the "${handleTitle()}" franchise`} isLoading={false} hasDivider variant='outlined'>
      <>
        {parts.map((mediaItem) => (
          <VerticalPoster
            key={mediaItem.id}
            width={['185px', '205px', '230px']}
            mediaItem={mediaItem ? { ...mediaItem } : undefined}
            mediaType={mediaItem?.title ? 'movie' : 'tv'}
            image={{
              alt: `${
                mediaItem?.title ? `${mediaItem.title} movie` : mediaItem?.name ? `${mediaItem.name} tv show` : ''
              } poster`,
              src: mediaItem?.poster_path || '',
              size: {
                thumbnail: 'w92',
                full: 'original'
              }
            }}
            rating={{
              rating: mediaItem?.vote_average || null,
              count: mediaItem?.vote_count || null
            }}
            title={mediaItem?.title || mediaItem?.name || ''}
            subtitle={`${handleReturnDate(mediaItem?.release_date || mediaItem?.first_air_date || '', 'year')}`}
            isLoading={false}
          />
        ))}
      </>
    </HorizontalGrid>
  );
};

export default Collection;
