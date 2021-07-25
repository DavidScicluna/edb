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

  return !isLoading && person ? (
    <HorizontalPoster
      mediaItem={{ ...person }}
      mediaType='person'
      image={{
        alt: `${person?.name || ''} person poster`,
        src: person?.profile_path || '',
        size: '780'
      }}
      title={person?.name || ''}
      subtitle={departments.find((department) => department.value === person?.known_for_department)?.name || ''}
      description={handleKnownFor()} // TODO: Add a Link component and on click open item page
      isLoaded
    />
  ) : (
    <HorizontalPoster
      mediaType='person'
      image={{
        alt: 'Person poster',
        src: '',
        size: '780'
      }}
      title='Lorem ipsum'
      subtitle='Lorem ipsum'
      description='Lorem ipsum'
      isLoaded={false}
    />
  );
};

export default HorizontalPerson;
