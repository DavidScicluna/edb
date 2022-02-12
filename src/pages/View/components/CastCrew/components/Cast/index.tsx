import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import Department from '../Department';
import { CastProps } from './types';

const incrementBy = 15;

const Cast = (props: CastProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  const { id, title, cast = [], isLoading = true, isError = false, isSuccess = false, isOpen = true, onToggle } = props;

  return (
    <Department
      id={id}
      title={title}
      total={cast?.length || 0}
      isOpen={isOpen}
      isLoading={isLoading}
      onToggle={onToggle}
    >
      {!isLoading && isError ? (
        <Error label='Oh no! Something went wrong' description={`Failed to fetch cast list!`} variant='outlined' />
      ) : !isLoading && isSuccess && cast && cast.length === 0 ? (
        <Empty label={`Cast list is currently empty!`} variant='outlined' />
      ) : !isLoading && isSuccess && cast && cast.length > 0 ? (
        <VStack width='100%' spacing={4}>
          <VerticalGrid displayMode='grid'>
            {() =>
              cast
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
                      person?.character
                        ? `As ${person.character}`
                        : person.roles
                        ? `As ${person.roles.map((role) => role.character).join(', ')}`
                        : ''
                    }
                    isLoading={isLoading}
                  />
                ))
            }
          </VerticalGrid>

          <ScaleFade
            in={(cast?.length || 0) > 0 && (cast?.length || 0) > incrementBy}
            unmountOnExit
            style={{ width: isSm ? '100%' : 'auto' }}
          >
            <LoadMore
              amount={totalVisible}
              total={cast?.length || 0}
              label='Cast'
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

export default Cast;
