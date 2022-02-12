import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import { handleReturnPersonJobLabel } from '../../common/utils';
import Department from '../Department';
import { CrewProps } from './types';

const incrementBy = 15;

const Crew = (props: CrewProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  const {
    id,
    title,
    crew = [],
    isLoading = true,
    isError = false,
    isSuccess = false,
    isOpen = false,
    onToggle
  } = props;

  return (
    <Department
      id={id}
      title={title}
      total={crew?.length || 0}
      isOpen={isOpen}
      isLoading={isLoading}
      onToggle={onToggle}
    >
      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${title} crew list!`}
          variant='outlined'
        />
      ) : !isLoading && isSuccess && crew && crew.length === 0 ? (
        <Empty label={`${_.capitalize(title)} crew list is currently empty!`} variant='outlined' />
      ) : !isLoading && isSuccess && crew && crew.length > 0 ? (
        <VStack width='100%' spacing={4}>
          <VerticalGrid displayMode='grid'>
            {() =>
              crew
                .filter((_person, index) => index < totalVisible)
                .map((person) => (
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
                    subtitle={
                      person.job
                        ? person.job
                        : person.jobs && person.jobs.length > 0
                        ? handleReturnPersonJobLabel(person.jobs || [])
                        : ''
                    }
                    isLoading={false}
                  />
                ))
            }
          </VerticalGrid>

          <ScaleFade
            in={(crew?.length || 0) > 0 && (crew?.length || 0) > incrementBy}
            unmountOnExit
            style={{ width: isSm ? '100%' : 'auto' }}
          >
            <LoadMore
              amount={totalVisible}
              total={crew?.length || 0}
              label={`${title} Crew`}
              onClick={() => setTotalVisible(totalVisible + incrementBy)}
            />
          </ScaleFade>
        </VStack>
      ) : (
        <VerticalGrid displayMode='grid'>
          {() =>
            _.range(0, incrementBy).map((_dummy, index: number) => (
              <VerticalPoster
                key={index}
                width='100%'
                mediaType='person'
                title='Lorem ipsum'
                subtitle='Lorem ipsum dolor sit amet'
                isLoading
              />
            ))
          }
        </VerticalGrid>
      )}
    </Department>
  );
};

export default Crew;
