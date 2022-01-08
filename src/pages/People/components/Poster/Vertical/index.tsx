import React, { ReactElement } from 'react';

import departments from '../../../../../common/data/departments';
import VerticalPoster from '../../../../../components/Poster/Vertical';
import { VerticalPersonPosterProps } from './types';

const VerticalPersonPoster = (props: VerticalPersonPosterProps): ReactElement => {
  const { person, width, isLoading = true } = props;
  const { name, profile_path, known_for_department } = person || {};

  return (
    <VerticalPoster
      width={width || '100%'}
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
      subtitle={
        departments.find((department) => department.value === known_for_department)?.name ||
        known_for_department ||
        'N/A'
      }
      isLoading={isLoading}
    />
  );
};

export default VerticalPersonPoster;
