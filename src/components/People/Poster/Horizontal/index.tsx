import React, { ReactElement } from 'react';

import arraySort from 'array-sort';

import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../Poster/Horizontal';
import { PosterProps } from '../types';
const size = utils.handleReturnImageSize('poster', 'sm');

const HorizontalPerson = ({ isLoading = true, person }: PosterProps): ReactElement => {
  const handleKnownFor = (): string => {
    const knownFor = arraySort(person?.known_for || [], 'voting_averge');

    return knownFor.join(', ');
  };

  return !isLoading && person ? (
    <HorizontalPoster
      mediaItemID={person.id}
      mediaType='person'
      image={{
        alt: `${person?.name || ''} person poster`,
        src: person?.profile_path || '',
        size
      }}
      title={person?.name || ''}
      subtitle={person?.known_for_department || ''}
      description={handleKnownFor()}
      isLoaded={true}
    />
  ) : (
    <HorizontalPoster
      mediaItemID={-1}
      mediaType='person'
      image={{
        alt: 'Person poster',
        src: '',
        size
      }}
      title='Lorem ipsum'
      subtitle='Lorem ipsum'
      description='Lorem ipsum'
      isLoaded={false}
    />
  );
};

export default HorizontalPerson;
