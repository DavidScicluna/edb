import React, { ReactElement } from 'react';

import departments from '../../../../common/data/departments';
import VerticalPoster from '../../../Poster/Vertical';
import { PosterProps } from '../types';

const VerticalPerson = ({ width, isLoading = true, person }: PosterProps): ReactElement => {
  return (
    <VerticalPoster
      width={width || ['185px', '205px', '230px']}
      mediaItem={person ? { ...person } : undefined}
      mediaType='person'
      image={{
        alt: `${person?.name || ''} person poster`,
        src: person?.profile_path || '',
        size: {
          thumbnail: 'w45',
          full: 'original'
        }
      }}
      title={person?.name || ''}
      subtitle={departments.find((department) => department.value === person?.known_for_department)?.name || ''}
      isLoading={isLoading}
    />
  );
};

export default VerticalPerson;
