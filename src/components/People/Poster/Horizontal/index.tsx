import React, { ReactElement } from 'react';

import arraySort from 'array-sort';

import departments from '../../../../common/data/departments';
import HorizontalPoster from '../../../Poster/Horizontal';
import { PosterProps } from '../types';

const HorizontalPerson = ({ isLoading = true, person }: PosterProps): ReactElement => {
  const handleKnownFor = (): string => {
    const knownFor = arraySort(person?.known_for || [], 'vote_average');
    const names: string[] = knownFor.map((item) => item.title || item.name || '');

    return names.join(', ');
  };

  return (
    <HorizontalPoster
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
      subtitle={
        departments.find((department) => department.value === person?.known_for_department)?.name ||
        person?.known_for_department ||
        ''
      }
      description={handleKnownFor()} // TODO: Add a Link component and on click open item page
      isLoading={isLoading}
    />
  );
};

export default HorizontalPerson;
