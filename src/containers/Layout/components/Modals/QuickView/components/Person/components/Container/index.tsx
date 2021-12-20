import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Text, ScaleFade } from '@chakra-ui/react';
import { Heart as HeartIcon } from 'react-feather';

import Button from '../../../../../../../../../components/Clickable/Button';
import Like from '../../../../../../../../../components/Clickable/Like';
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
    <VStack width='100%' alignItems='flex-start' spacing={4}>
      <VStack width='100%' alignItems='flex-start' spacing={2}>
        <VStack width='100%' maxWidth='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
          <SkeletonText offsetY={isSm ? 12 : 18} isLoaded={!isLoading}>
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={isSm ? '2xl' : '4xl'}
              fontWeight='bold'
            >
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
            renderButton={({ isLiked, onClick }) => (
              <Button
                color={isLiked ? 'red' : 'gray'}
                isFullWidth={isSm}
                isDisabled={isLoading || !person}
                // leftIcon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
                leftIcon={HeartIcon}
                onClick={() => onClick()}
                size='md'
                variant='outlined'
              >
                {isLiked ? 'Liked' : 'Like'}
              </Button>
            )}
            mediaType='person'
            mediaItem={person}
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
