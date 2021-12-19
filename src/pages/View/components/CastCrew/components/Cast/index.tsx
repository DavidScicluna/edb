import { ReactElement, useState } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import { handleReturnPersonRoleLabel } from '../../../../Show/common/utils';
import Panel from '../Panel';
import { CastProps } from './types';

const incrementBy = 25;

const Cast = (props: CastProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 340px)');

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  const {
    mediaType,
    mediaItemTitle,
    cast,
    isLoading = true,
    isError = false,
    isSuccess = false,
    isOpen = true,
    onToggle
  } = props;

  return (
    <Panel
      id='cast'
      title='Cast'
      total={cast?.length || 0}
      isOpen={isOpen}
      onToggle={onToggle}
      footer={
        (cast?.length || 0) > incrementBy ? (
          <LoadMore
            amount={totalVisible}
            total={cast?.length || 0}
            label='Cast Members'
            onClick={() => setTotalVisible(totalVisible + incrementBy)}
          />
        ) : undefined
      }
    >
      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${mediaItemTitle ? `"${mediaItemTitle}"` : ''} ${
            mediaType === 'tv' ? 'tv show' : 'movie'
          } cast list!`}
          variant='outlined'
        />
      ) : !isLoading && isSuccess && cast && cast.length === 0 ? (
        <Empty
          label={`${mediaItemTitle ? `"${mediaItemTitle}"` : ''} ${
            mediaType === 'tv' ? 'tv show' : 'movie'
          } cast list is currently empty!`}
          variant='outlined'
        />
      ) : !isLoading && isSuccess && cast && cast.length > 0 ? (
        <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 4, 5]} spacing={2}>
          {cast
            .filter((_person, index) => index < totalVisible)
            .map((person) => (
              <VerticalPoster
                key={person.id}
                width='100%'
                mediaItem={
                  person
                    ? {
                        known_for_department: person.known_for_department || '',
                        id: person.id || -1,
                        name: person.name || '',
                        gender: person.gender || 0,
                        popularity: person.popularity || -1,
                        profile_path: person.profile_path || null,
                        adult: person.adult || false,
                        known_for: undefined
                      }
                    : undefined
                }
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
                  mediaType === 'movie' && person.character
                    ? `As ${person.character}`
                    : mediaType === 'tv' && person.roles && person.roles.length > 0
                    ? handleReturnPersonRoleLabel(person.roles)
                    : 'N/A'
                }
                isLoading={isLoading}
              />
            ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 4, 5]} spacing={2}>
          {_.range(0, 20).map((_dummy, index: number) => (
            <VerticalPoster
              key={index}
              width='100%'
              mediaType='person'
              title='Lorem ipsum'
              subtitle='Lorem ipsum dolor sit amet'
              isLoading
            />
          ))}
        </SimpleGrid>
      )}
    </Panel>
  );
};

export default Cast;
