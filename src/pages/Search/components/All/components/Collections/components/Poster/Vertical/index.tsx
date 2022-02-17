import { ReactElement } from 'react';

import VerticalPoster from '../../../../../../../../../components/Poster/Vertical';
import { VerticalCollectionPosterProps } from './types';

const VerticalCollectionPoster = (props: VerticalCollectionPosterProps): ReactElement => {
  const { collection, width, isLoading = true } = props;
  const { name, poster_path, overview } = collection || {};

  return (
    <VerticalPoster
      width={width || '100%'}
      mediaItem={collection ? { ...collection } : undefined}
      mediaType='collection'
      image={{
        alt: `${name || ''} collection poster`,
        src: poster_path || '',
        size: {
          thumbnail: 'w92',
          full: 'original'
        }
      }}
      title={name || ''}
      subtitle={overview || ''}
      isLoading={isLoading}
    />
  );
};

export default VerticalCollectionPoster;
