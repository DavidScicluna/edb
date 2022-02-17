
import { ReactElement } from 'react';

import { useConst, HStack, Text } from '@chakra-ui/react';

import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import Certification from './components/Certification';
import Date from './components/Date';
import Genres from './components/Genres';
import Language from './components/Language';
import Runtime from './components/Runtime';
import Status from './components/Status';
import { TVShowTitleProps } from './types';

import { FullTV } from '../../../../../../common/types/tv';
import Divider from '../../../../../../components/Divider';
import Rating from '../../../../../../components/Rating';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import Title from '../../../../components/Title';

const dummies = _.range(25, 75, 10);

// TODO: Make this dynamic
export const handleReturnCertification = (content_ratings: FullTV['content_ratings']): string | undefined => {
  const certification = (content_ratings?.results || []).find((item) => item.iso_3166_1 === 'US');

  if (certification && certification.rating) {
    return certification.rating;
  } else {
    return undefined;
  }
};

const TVShowTitle = (props: TVShowTitleProps): ReactElement => {
  const [ratingRef, { height }] = useElementSize();

  const { show, isLoading = true } = props;
  const {
    id,
    name,
    vote_average,
    vote_count,
    status,
    in_production,
    first_air_date,
    last_air_date,
    genres,
    original_language,
    content_ratings,
    episode_run_time: runtime
  } = show || {};

  const dummy = useConst<number>(_.sample(dummies) || 75);

  const certification: string | undefined = handleReturnCertification(content_ratings);

  return (
    <Title
      mediaType='tv'
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
              {name || 'TV Show Name'}
            </Text>
          </SkeletonText>
          <Rating count={vote_count} size={fontSize} isLoading={isLoading}>
            {vote_average}
          </Rating>
        </HStack>
      )}
      renderSubtitles={({ color, fontSize }) =>
        _.compact([
          <Status key={`tv-show-${id}-status`} status={status} fontSize={fontSize} isLoading={isLoading} />,
          (!_.isNil(first_air_date) &&
            !_.isEmpty(first_air_date) &&
            !_.isNil(last_air_date) &&
            !_.isEmpty(last_air_date)) ||
          isLoading ? (
            <Date
              key={`tv-show-${id}-date`}
              in_production={in_production}
              first_air_date={first_air_date}
              last_air_date={last_air_date}
              color={color}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(genres) && !_.isEmpty(genres)) || isLoading ? (
            <Genres
              key={`tv-show-${id}-genres`}
              genres={genres}
              color={color}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(certification) && !_.isEmpty(certification)) || isLoading ? (
            <Certification
              key={`tv-show-${id}-certification`}
              certification={certification}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(original_language) && !_.isEmpty(original_language)) || isLoading ? (
            <Language
              key={`tv-show-${id}-original_language`}
              language={original_language}
              color={color}
              fontSize={fontSize}
              isLoading={isLoading}
            />
          ) : undefined,
          (!_.isNil(runtime) && !_.isEmpty(runtime)) || isLoading ? (
            <Runtime
              key={`tv-show-${id}-runtime`}
              runtime={(runtime || []).reduce((a, b) => a + b, 0) / (runtime?.length || 0)}
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

export default TVShowTitle;
