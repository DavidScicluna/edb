import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Text, ScaleFade } from '@chakra-ui/react';

import Like from '../../../../../../../../../components/Like';
import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import Date from '../../../../../../../../../pages/Person/components/Details/components/Date';
import Departments from '../../../../../../../../../pages/Person/components/Details/components/Departments';
import Stats from '../Stats';
import { ContainerProps } from './types';

const Container = (props: ContainerProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const {
    person,
    departments,
    totalMovieCredits,
    totalTvCredits,
    totalCrewCredits,
    isLoading = false,
    isError = false
  } = props;

  return (
    <VStack width='100%' alignItems='flex-start' spacing={6}>
      <VStack width='100%' alignItems='flex-start' spacing={2}>
        <VStack width='100%' maxWidth='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
          <SkeletonText offsetY={isSm ? 12 : 18} isLoaded={!isLoading}>
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={isSm ? '2xl' : '4xl'}
              fontWeight='bold'>
              {person?.name || 'Unknown'}
            </Text>
          </SkeletonText>

          <Departments departments={departments} isLoading={isLoading} />
        </VStack>

        <Date
          birthday={person?.birthday}
          place_of_birth={person?.place_of_birth}
          deathday={person?.deathday}
          isLoading={isLoading}
          isError={isError}
        />

        <ScaleFade in={!isError} unmountOnExit>
          <Like
            buttonType='button'
            isDisabled={isLoading}
            title={person?.name || ''}
            mediaType='person'
            mediaItem={
              person
                ? {
                    known_for_department: person.known_for_department,
                    id: person.id,
                    name: person.name,
                    gender: person.gender,
                    popularity: person.popularity,
                    profile_path: person.profile_path,
                    adult: person.adult
                  }
                : undefined
            }
            size='md'
          />
        </ScaleFade>
      </VStack>

      <Stats
        totalMovieCredits={totalMovieCredits}
        totalTvCredits={totalTvCredits}
        totalCrewCredits={totalCrewCredits}
        isLoading={isLoading}
      />
    </VStack>
  );
};

export default Container;
