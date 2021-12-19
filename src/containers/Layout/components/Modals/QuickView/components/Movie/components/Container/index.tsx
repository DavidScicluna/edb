import { ReactElement } from 'react';

import { useColorMode, VStack, Text, ScaleFade } from '@chakra-ui/react';

import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import Label from '../../../../../../../../../pages/View/components/Details/components/Label';
import Title from '../../../../../../../../../pages/View/components/Title';
import Actions from './components/Actions';
import Info from './components/Info';
import Overview from './components/Overview';
import { ContainerProps } from './types';

const Container = (props: ContainerProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { movie, isLoading = true, isError = false } = props;

  return (
    <VStack width='100%' maxWidth='100%' alignItems='flex-start' spacing={4}>
      <VStack width='100%' maxWidth='100%' alignItems='flex-start' spacing={2}>
        <Title
          title={movie?.title}
          rating={{
            rating: movie?.vote_average || null,
            count: movie?.vote_count || null
          }}
          date={movie?.release_date}
          // certification={movie?.release_dates.results.find((item) => item.iso_3166_1 === 'US')}
          genres={movie?.genres}
          runtime={movie?.runtime}
          isLoading={isLoading}
        />
        <ScaleFade in={(movie?.tagline?.length || 0) > 0} unmountOnExit>
          <Label width='100%' label='Tagline'>
            <SkeletonText offsetY={8} isLoaded={!isLoading}>
              <Text
                align='left'
                color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                fontSize='md'
                fontStyle='italic'
              >
                {movie?.tagline}
              </Text>
            </SkeletonText>
          </Label>
        </ScaleFade>
        <Label width='100%' label='Overview'>
          <Overview overview={movie?.overview} isLoading={isLoading} />
        </Label>
        <Info
          budget={movie?.budget}
          revenue={movie?.revenue}
          originalLanguage={movie?.original_language}
          languages={movie?.spoken_languages}
          isLoading={isLoading}
        />
      </VStack>

      <ScaleFade in={!isError} unmountOnExit style={{ width: '100%' }}>
        <Actions
          title={movie?.title}
          isLoading={isLoading}
          mediaItem={
            movie
              ? {
                  adult: movie.adult,
                  poster_path: movie.poster_path,
                  overview: movie.overview,
                  release_date: movie.release_date,
                  id: movie.id,
                  original_language: movie.original_language,
                  original_title: movie.original_title,
                  title: movie.title,
                  backdrop_path: movie.backdrop_path,
                  popularity: movie.popularity,
                  video: movie.video,
                  vote_average: movie.vote_average,
                  vote_count: movie.vote_count,
                  genre_ids: movie.genres.map((genre) => genre.id)
                }
              : undefined
          }
        />
      </ScaleFade>
    </VStack>
  );
};

export default Container;
