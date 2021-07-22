import React, { ReactElement } from 'react';

import departments from '../../../../common/data/departments';
import utils from '../../../../common/utils/utils';
import VerticalPoster from '../../../Poster/Vertical';
import { PosterProps } from '../types';
const size = utils.handleReturnImageSize('poster', 'sm');

const VerticalPerson = ({ width, isLoading = true, person }: PosterProps): ReactElement => {
  return !isLoading && person ? (
    <VerticalPoster
      width={width || ['185px', '205px', '230px']}
      mediaItem={{ ...person }}
      mediaType='person'
      image={{
        alt: `${person?.name || ''} person poster`,
        src: person?.profile_path || '',
        size
      }}
      title={person?.name || ''}
      subtitle={departments.find((department) => department.value === person?.known_for_department)?.name || ''}
      isLoaded
    />
  ) : (
    <VerticalPoster
      width={width || ['185px', '205px', '230px']}
      mediaType='person'
      image={{
        alt: 'Person poster',
        src: '',
        size
      }}
      title='Lorem ipsum'
      subtitle='Lorem ipsum'
      isLoaded={false}
    />
  );
};

export default VerticalPerson;
