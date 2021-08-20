import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Text, Fade, ScaleFade } from '@chakra-ui/react';
import moment from 'moment';

import Card from '../../../../components/Card';
import Like from '../../../../components/Like';
import SkeletonText from '../../../../components/Skeleton/Text';
import Background from './components/Background';
import Departments from './components/Departments';
import Poster from './components/Poster';
// import Stats from './components/Stats';
import Socials from './components/Socials';
import { DetailsProps } from './types';

const width = [
  'calc(100% - 162.5px)',
  'calc(100% - 162.5px)',
  'calc(100% - 225px)',
  'calc(100% - 287.5px)',
  'calc(100% - 350px)',
  'calc(100% - 412.5px)'
];
const left = ['162.5px', '162.5px', '225px', '287.5px', '350px', '412.5px'];

const Details = (props: DetailsProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const {
    person,
    // totalMovieCredits,
    // totalTvCredits,
    // totalCrewCredits,
    departments,
    socials,
    isLoading = false,
    isError = false,
    onClickPoster
  } = props;

  return (
    <Card isFullWidth p={2}>
      {{
        body: (
          <VStack width='100%' alignItems='stretch' spacing={2}>
            {isSm ? (
              <Poster
                name={person?.name}
                path={person?.profile_path}
                isLoading={isLoading}
                isError={isError}
                onClickPoster={onClickPoster}
              />
            ) : (
              <Background alt={`${person?.name || ''} background`} size='780'>
                {{
                  poster: (
                    <Poster
                      name={person?.name}
                      path={person?.profile_path}
                      isLoading={isLoading}
                      isError={isError}
                      onClickPoster={onClickPoster}
                    />
                  ),

                  socials: <Socials socials={socials} name={person?.name} isLoading={isLoading} />
                }}
              </Background>
            )}

            <VStack
              width={isSm ? '100%' : width}
              maxWidth={isSm ? '100%' : width}
              position='relative'
              left={isSm ? 0 : left}
              alignItems='flex-start'
              spacing={2}>
              <VStack width='100%' maxWidth='100%' alignItems='flex-start' spacing={isLoading ? 1 : 0}>
                <SkeletonText isLoaded={!isLoading}>
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

              <Fade in={!isError} unmountOnExit>
                <SkeletonText isLoaded={!isLoading}>
                  <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
                    {`Born on ${moment(person?.birthday || '', 'YYYY-MM-DD').format('LL')}${
                      person?.place_of_birth ? ` in ${person?.place_of_birth}` : ''
                    }${
                      person?.deathday ? ` - ${moment(person?.deathday || '', 'YYYY-MM-DD').format('LL')}` : ''
                    } (${moment(person?.deathday || new Date()).diff(
                      moment(person?.birthday || '', 'YYYY-MM-DD'),
                      'years'
                    )} years old)`}
                  </Text>
                </SkeletonText>
              </Fade>

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

              {/* <Stats
            totalMovieCredits={totalMovieCredits}
            totalTvCredits={totalTvCredits}
            totalCrewCredits={totalCrewCredits}
            isLoading={isLoading}
          /> */}
            </VStack>
          </VStack>
        )
      }}
    </Card>
  );
};

export default Details;
