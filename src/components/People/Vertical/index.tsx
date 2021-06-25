import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import useSelector from '../../../common/hooks/useSelectorTyped';
import { PartialPerson } from '../../../common/types/person';
import utils from '../../../common/utils/utils';
import Empty from '../../Empty';
import Error from '../../Error';
import HorizontalPoster from '../../Poster/Horizontal';
import VerticalPoster from '../../Poster/Vertical';
import { PeopleProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const VerticalMovies = ({ isLoading, isError, isSuccess, people }: PeopleProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return isLoading && hasOptionsDownloaded ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {[...Array(people ? people.length : 20)].map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={index}
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
        ) : (
          <VerticalPoster
            key={index}
            width='100%'
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
        )
      )}
    </SimpleGrid>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='outlined' />
  ) : isSuccess && people ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {people.map((person: PartialPerson, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={index}
            mediaType='person'
            image={{
              alt: `${person?.name || ''} person poster`,
              src: person?.profile_path || '',
              size
            }}
            title={person?.name || ''}
            subtitle={person.known_for_department}
            description={person?.known_for.map((item) => item.name || item.title || '').join(', ') || ''}
            isLoaded={true}
          />
        ) : (
          <VerticalPoster
            key={index}
            width='100%'
            mediaType='person'
            image={{
              alt: `${person?.name || ''} person poster`,
              src: person?.profile_path || '',
              size
            }}
            title={person?.name || ''}
            subtitle={person.known_for_department}
            isLoaded={true}
          />
        )
      )}
    </SimpleGrid>
  ) : (
    <Empty label='People list is currently empty!' variant='outlined' />
  );
};

export default VerticalMovies;
