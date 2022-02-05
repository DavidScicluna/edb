import React, { ReactElement } from 'react';

import sort from 'array-sort';

import HorizontalPoster from '../../../../../components/Poster/Horizontal';
import { HorizontalPersonPosterProps } from './types';

const HorizontalPersonPoster = (props: HorizontalPersonPosterProps): ReactElement => {
  const { person, isLoading = true } = props;
  const { name, profile_path, known_for, known_for_department } = person || {};

  return (
    <HorizontalPoster
      mediaItem={person ? { ...person } : undefined}
      mediaType='person'
      image={{
        alt: `${name || ''} person poster`,
        src: profile_path || '',
        size: {
          thumbnail: 'w45',
          full: 'original'
        }
      }}
      title={name || ''}
      subtitle={known_for_department || ''}
      description={sort([...(known_for || [])], 'popularity', { reverse: true })
        .map((mediaItem) => mediaItem.title || mediaItem.name || undefined)
        .join(' • ')}
      isLoading={isLoading}
    />
  );
};

export default HorizontalPersonPoster;
