import { ReactElement } from 'react';

import _ from 'lodash';

import Empty from '../../../../../../../../../../../../../components/Empty';
import Error from '../../../../../../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../../../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../../../../../../../../../../components/Poster/Vertical';
import { CrewProps } from './types';

const Crew = (props: CrewProps): ReactElement => {
  const { crew, name, isError = false, isSuccess = false, isLoading = true } = props;

  return (
    <HorizontalGrid title='Crew' isLoading={isLoading} hasDivider variant='outlined'>
      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} episode crew!`}
          variant='transparent'
        />
      ) : !isLoading && isSuccess && crew && crew.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} episode crew list is currently empty!`} variant='transparent' />
      ) : !isLoading && isSuccess && crew && crew.length > 0 ? (
        <>
          {crew.map((person) => (
            <VerticalPoster
              key={person.id}
              width={['185px', '205px', '230px']}
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
              isLoading={isLoading}
            />
          ))}
        </>
      ) : (
        <>
          {_.range(0, 20).map((_dummy, index: number) => (
            <VerticalPoster
              key={index}
              width={['185px', '205px', '230px']}
              mediaType='person'
              title='Lorem ipsum'
              subtitle='Lorem ipsum dolor sit amet'
              isLoading
            />
          ))}
        </>
      )}
    </HorizontalGrid>
  );
};

export default Crew;
