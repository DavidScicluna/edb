import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useConst, HStack, Text } from '@chakra-ui/react';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import sample from 'lodash/sample';
import { useElementSize } from 'usehooks-ts';

import { FullMovie } from '../../../../../../common/types/movie';
import Divider from '../../../../../../components/Divider';
import Rating from '../../../../../../components/Rating';
import Title from '../../../../components/Title';

import Certification from './components/Certification';
import Date from './components/Date';
import Genres from './components/Genres';
import Language from './components/Language';
import Runtime from './components/Runtime';
import Status from './components/Status';
import { MovieTitleProps } from './types';

const dummies = range(25, 100, 5);

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

	const dummy = useConst<number>(sample(dummies) || 75);

	const certification: string | undefined = handleReturnCertification(release_dates);

	return (
		<Title
			mediaType='movie'
			renderTitle={({ color, fontSize, fontWeight, lineHeight }) => (
				<HStack divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
					<Skeleton width={isLoading ? `${dummy}%` : 'auto'} isLoaded={!isLoading} type='text'>
						<Text
							ref={ratingRef}
							align='left'
							color={color}
							fontSize={fontSize}
							fontWeight={fontWeight}
							lineHeight={lineHeight}
							whiteSpace={isLoading ? 'nowrap' : 'normal'}
						>
							{title || 'Movie Title'}
						</Text>
					</Skeleton>
					<Rating count={vote_count} size={fontSize} isLoading={isLoading}>
						{vote_average}
					</Rating>
				</HStack>
			)}
			renderSubtitles={({ color, fontSize }) =>
				compact([
					<Status key={`movie-${id}-status`} status={status} fontSize={fontSize} isLoading={isLoading} />,
					!(isNil(release_date) || isEmpty(release_date)) || isLoading ? (
						<Date
							key={`movie-${id}-release_date`}
							date={release_date}
							color={color}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(genres) || isEmpty(genres)) || isLoading ? (
						<Genres
							key={`movie-${id}-genres`}
							genres={genres}
							color={color}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(certification) || isEmpty(certification)) || isLoading ? (
						<Certification
							key={`movie-${id}-certification`}
							certification={certification}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(original_language) || isEmpty(original_language)) || isLoading ? (
						<Language
							key={`movie-${id}-original_language`}
							language={original_language}
							color={color}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(runtime) || isEmpty(runtime)) || isLoading ? (
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
