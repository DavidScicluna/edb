import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, SimpleGrid } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { PartialPerson } from '../../../../common/types/person';
import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { PeopleProps } from './types';

const size = utils.handleReturnImageSize('poster', 'sm');

const People = ({ people, isLoading = false }: PeopleProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return (
    <VStack width='100%' spacing={4} px={2}>
      {isLoading && !hasOptionsDownloaded ? (
        <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
          {[...Array((people && people.results.length) || 20)].map((_dummy, index) =>
            displayMode === 'list' ? (
              <HorizontalPoster
                key={index}
                mediaType='person'
                image={{
                  alt: 'Person poster',
                  src: '',
                  size
                }}
                rating={{
                  rating: null,
                  count: null
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
                rating={{
                  rating: null,
                  count: null
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            )
          )}
        </SimpleGrid>
      ) : (
        <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
          {people &&
            people.results.map((person: PartialPerson, index: number) =>
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
      )}
    </VStack>
  );
};

export default People;
