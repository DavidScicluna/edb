import { ReactElement } from 'react';

import { VisuallyHidden } from '@chakra-ui/react';
import _ from 'lodash';

import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import { handleReturnPersonRoleLabel } from '../../../../Show/common/utils';
import Panel from '../Panel';
import { CastProps } from './types';

const Cast = (props: CastProps): ReactElement => {
  const { mediaType, mediaItemTitle, cast, isLoading = true, isError = false, isSuccess = false } = props;

  return (
    <Panel title='Cast' total={cast?.length || 0}>
      <>
        <VisuallyHidden>
          <span id='cast' />
        </VisuallyHidden>

        {!isLoading && isError ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${mediaItemTitle ? `"${mediaItemTitle}"` : ''} ${
              mediaType === 'tv' ? 'tv show' : 'movie'
            } Cast list!`}
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
          <>
            {cast.map((person) => (
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
                  mediaType === 'movie'
                    ? `As ${person.character}`
                    : mediaType === 'tv' && person.roles && person.roles.length > 0
                    ? handleReturnPersonRoleLabel(person.roles)
                    : 'N/A'
                }
                isLoading={isLoading}
              />
            ))}
          </>
        ) : (
          <>
            {_.range(0, isSuccess && cast && cast.length > 0 ? cast.length : 20).map((_dummy, index: number) => (
              <VerticalPoster
                key={index}
                width='100%'
                mediaType='person'
                title='Lorem ipsum'
                subtitle='Lorem ipsum dolor sit amet'
                isLoading
              />
            ))}
          </>
        )}
      </>
    </Panel>
  );
};

export default Cast;
