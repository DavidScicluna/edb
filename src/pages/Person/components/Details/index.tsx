import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Text } from '@chakra-ui/react';
import moment from 'moment';

import Card from '../../../../components/Card';
import SkeletonText from '../../../../components/Skeleton/Text';
import Background from './components/Background';
import Departments from './components/Departments';
import Poster from './components/Poster';
// import Stats from './components/Stats';
import Socials from './components/Socials';
import { DetailsProps } from './types';

const Details = (props: DetailsProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isMob] = useMediaQuery('(max-width: 640px)');

  const {
    person,
    // totalMovieCredits,
    // totalTvCredits,
    // totalCrewCredits,
    departments,
    socials,
    isLoading = false,
    onClickPoster
  } = props;

  return (
    <Card isFullWidth p={2}>
      <VStack width='100%' spacing={2}>
        {isMob ? (
          <Poster name={person?.name} path={person?.profile_path} isLoading={isLoading} onClickPoster={onClickPoster} />
        ) : (
          <Background alt={`${person?.name || ''} background`} size='780'>
            {{
              poster: (
                <Poster
                  name={person?.name}
                  path={person?.profile_path}
                  isLoading={isLoading}
                  onClickPoster={onClickPoster}
                />
              ),

              socials: <Socials socials={socials} name={person?.name} isLoading={isLoading} orientation='vertical' />
            }}
          </Background>
        )}

        <VStack
          width={isMob ? '100%' : 'calc(100% - 22.5vw)'}
          maxWidth={isMob ? '100%' : 'calc(100% - 22.5vw)'}
          position='relative'
          left={isMob ? 0 : '11.25vw'}
          alignItems='flex-start'
          spacing={2}>
          <VStack width='100%' alignItems='flex-start' spacing={isLoading ? 1 : 0}>
            <SkeletonText isLoaded={!isLoading}>
              <Text
                align='left'
                color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                fontSize={isMob ? '2xl' : '4xl'}
                fontWeight='bold'>
                {person?.name || ''}
              </Text>
            </SkeletonText>

            <Departments departments={departments} isLoading={isLoading} />
          </VStack>

          <SkeletonText isLoaded={!isLoading}>
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
              {`Born on ${moment(person?.birthday || '', 'YYYY-MM-DD').format('LL')}${
                person?.place_of_birth ? ` in ${person?.place_of_birth}` : ''
              }${person?.deathday ? ` - ${moment(person?.deathday || '', 'YYYY-MM-DD').format('LL')}` : ''} (${moment(
                person?.deathday || new Date()
              ).diff(moment(person?.birthday || '', 'YYYY-MM-DD'), 'years')} years old)`}
            </Text>
          </SkeletonText>

          {/* <Stats
            totalMovieCredits={totalMovieCredits}
            totalTvCredits={totalTvCredits}
            totalCrewCredits={totalCrewCredits}
            isLoading={isLoading}
          /> */}
        </VStack>
      </VStack>
    </Card>
  );
};

export default Details;
