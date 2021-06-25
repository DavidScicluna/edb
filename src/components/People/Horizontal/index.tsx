import React, { ReactElement } from 'react';

import useSelector from '../../../common/hooks/useSelectorTyped';
import { PartialPerson } from '../../../common/types/person';
import utils from '../../../common/utils/utils';
import Empty from '../../Empty';
import Error from '../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { PeopleProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const HorizontalMovies = ({ isLoading, isError, isSuccess, people }: PeopleProps): ReactElement => {
  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);

  return isLoading && hasOptionsDownloaded ? (
    <>
      {[...Array(people ? people.length : 20)].map((_dummy, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px']}
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
      ))}
    </>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='transparent' />
  ) : isSuccess && people ? (
    <>
      {people.map((person: PartialPerson, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px']}
          mediaType='person'
          image={{
            alt: `${person?.name || ''} person poster`,
            src: person?.profile_path || '',
            size
          }}
          title={person?.name || 'N/A'}
          subtitle={person?.known_for_department || ''}
          isLoaded={true}
        />
      ))}
    </>
  ) : (
    <Empty label='People list is currently empty!' variant='transparent' />
  );
};

export default HorizontalMovies;
