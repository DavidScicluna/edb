import { ReactElement } from 'react';

import { VisuallyHidden } from '@chakra-ui/react';
import _ from 'lodash';

import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import Panel from '../Panel';
import { CastProps } from './types';

const Cast = (props: CastProps): ReactElement => {
  const { cast, isLoading = true, isError = false, isSuccess = false } = props;

  return (
    <Panel title='Cast' total={cast?.length || 0}>
      <>
        <VisuallyHidden>
          <span id='cast' />
        </VisuallyHidden>

        {!isLoading && isError ? (
          <Error
            label='Oh no! Something went wrong'
            description='Failed to fetch {MOVIE TITLE} Cast list!'
            variant='outlined'
          />
        ) : !isLoading && isSuccess && cast && cast.length === 0 ? (
          <Empty label='{MOVIE TITLE} Cast list is currently empty!' variant='outlined' />
        ) : !isLoading && isSuccess && cast && cast.length > 0 ? (
          <>
            {cast.map((person) => (
              <VerticalPoster
                key={person.id}
                width='100%'
                // mediaItem={person ? { ...person } : undefined}
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
                subtitle={`As ${person.character}` || 'N/A'}
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
                subtitle='2021 • Lorem ipsum dolor sit amet'
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
