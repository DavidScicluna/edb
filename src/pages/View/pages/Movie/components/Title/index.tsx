import { ReactElement } from 'react';

import { useConst, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { FullMovie } from '../../../../../../common/types/movie';
import Divider from '../../../../../../components/Divider';
import Rating from '../../../../../../components/Rating';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import Title from '../../../../components/Title';
import Certification from './components/Certification';
import Date from './components/Date';
import Genres from './components/Genres';
import Language from './components/Language';
import Runtime from './components/Runtime';
import Status from './components/Status';
import { MovieTitleProps } from './types';

const dummies = _.range(25, 75, 10);

// TODO: Make this dynamic
const handleReturnCertification = (release_dates: FullMovie['release_dates']): string | undefined => {
  const certification = (release_dates?.results || []).find((item) => item.iso_3166_1 === 'US');

  if (certification && certification?.release_dates && certification?.release_dates[0]) {
    return certification?.release_dates[0].certification;
  } else {
    return undefined;
  }
};

const MovieTitle = (props: MovieTitleProps): ReactElement => {
  const [ratingRef, { height }] = useElementSize();

  const { movie, isLoading = true } = props;
  const {
    id,
    title,
    vote_count,
    vote_average,
    status,
    release_date,
    release_dates,
    genres,
    original_language,
    runtime
  } = movie || {};

  const dummy = useConst<number>(_.sample(dummies) || 75);

  const certification: string | undefined = handleReturnCertification(release_dates);

  return (
    <Title
      mediaType='movie'
      renderTitle={({ color, fontSize, fontWeight }) => (
        <HStack divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
          <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
            <Text
              ref={ratingRef}
              align='left'
              color={color}
              fontSize={fontSize}
              fontWeight={fontWeight}
              whiteSpace={isLoading ? 'nowrap' : 'normal'}
            >
              {title || 'Movie Title'}
            </Text>
          </SkeletonText>
          <Rating count={vote_count} size={fontSize} isLoading={isLoading}>
            {vote_average}
          </Rating>
        </HStack>
      )}
      renderSubtitles={({ color, fontSize }) =>
        _.compact([
          <Status key={`movie-${id}-status`} status={status} fontSize={fontSize} isLoading={isLoading} />,
          (!_.isNil(release_date) && !_.isEmpty(release_date)) || isLoading ? (
            <Date
              key={`movie-${id}-release_date`}
              date={release_date}
              color={color}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(genres) && !_.isEmpty(genres)) || isLoading ? (
            <Genres
              key={`movie-${id}-genres`}
              genres={genres}
              color={color}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(certification) && !_.isEmpty(certification)) || isLoading ? (
            <Certification
              key={`movie-${id}-certification`}
              certification={certification}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(original_language) && !_.isEmpty(original_language)) || isLoading ? (
            <Language
              key={`movie-${id}-original_language`}
              language={original_language}
              color={color}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(runtime) && !_.isEmpty(runtime)) || isLoading ? (
            <Runtime
              key={`movie-${id}-runtime`}
              runtime={runtime}
              color={color}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined
        ])
      }
      isLoading={isLoading}
    />
  );
};

export default MovieTitle;
