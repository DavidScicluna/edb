import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useConst, HStack, Text } from '@chakra-ui/react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import sample from 'lodash/sample';
import { useElementSize } from 'usehooks-ts';

import { FullTV } from '../../../../../../common/types/tv';
import Divider from '../../../../../../components/Divider';
import Rating from '../../../../../../components/Rating';
import Title from '../../../../components/Title';

import Certification from './components/Certification';
import Date from './components/Date';
import Genres from './components/Genres';
import Language from './components/Language';
import Runtime from './components/Runtime';
import Status from './components/Status';
import { TVShowTitleProps } from './types';

const dummies = range(25, 100, 5);

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

	const dummy = useConst<number>(sample(dummies) || 75);

	const certification: string | undefined = handleReturnCertification(content_ratings);

	return (
		<Title
			mediaType='tv'
			renderTitle={({ color, fontSize, fontWeight, lineHeight }) => (
				<HStack divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
					<Skeleton width={isLoading ? `${dummy}%` : 'auto'} isLoaded={!isLoading} variant='text'>
						<Text
							ref={ratingRef}
							align='left'
							color={color}
							fontSize={fontSize}
							fontWeight={fontWeight}
							lineHeight={lineHeight}
							whiteSpace={isLoading ? 'nowrap' : 'normal'}
						>
							{name || 'TV Show Name'}
						</Text>
					</Skeleton>
					<Rating count={vote_count} size={fontSize} isLoading={isLoading}>
						{vote_average}
					</Rating>
				</HStack>
			)}
			renderSubtitles={({ color, fontSize }) =>
				compact([
					<Status key={`tv-show-${id}-status`} status={status} fontSize={fontSize} isLoading={isLoading} />,
					(!(isNil(first_air_date) || isEmpty(first_air_date)) &&
						!(isNil(last_air_date) || isEmpty(last_air_date))) ||
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
					!(isNil(genres) || isEmpty(genres)) || isLoading ? (
						<Genres
							key={`tv-show-${id}-genres`}
							genres={genres}
							color={color}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(certification) || isEmpty(certification)) || isLoading ? (
						<Certification
							key={`tv-show-${id}-certification`}
							certification={certification}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(original_language) || isEmpty(original_language)) || isLoading ? (
						<Language
							key={`tv-show-${id}-original_language`}
							language={original_language}
							color={color}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(runtime) || isEmpty(runtime)) || isLoading ? (
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
