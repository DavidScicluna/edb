import { ReactElement } from 'react';

import { VisuallyHidden } from '@chakra-ui/react';
import _ from 'lodash';

import { Crew as CrewType } from '../../../../../../common/types/movie';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import Panel from '../Panel';
import { CrewProps } from './types';

const Crew = (props: CrewProps): ReactElement => {
  const { crew, title, isLoading = true, isError = false, isSuccess = false } = props;

  return (
    <Panel title={title} total={crew?.length || 0}>
      <>
        <VisuallyHidden>
          <span id={`${title.toLowerCase()}-crew`} />
        </VisuallyHidden>

        {!isLoading && isError ? (
          <Error
            label='Oh no! Something went wrong'
            description='Failed to fetch {MOVIE TITLE} ${title} Crew list!'
            variant='outlined'
          />
        ) : !isLoading && isSuccess && crew && crew.length === 0 ? (
          <Empty label='{MOVIE TITLE} ${title} Crew list is currently empty!' variant='outlined' />
        ) : !isLoading && isSuccess && crew && crew.length > 0 ? (
          <>
            {crew.map((person: CrewType) => (
              <VerticalPoster
                key={person.id}
                width='100%'
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
                subtitle={person.job || 'N/A'}
                isLoading={false}
              />
            ))}
          </>
        ) : (
          <>
            {_.range(0, isSuccess && crew && crew.length > 0 ? crew.length : 20).map((_dummy, index: number) => (
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

export default Crew;
