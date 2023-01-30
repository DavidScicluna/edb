import { FC } from 'react';

import { usePersonContext } from '../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { PersonCredits } from '../../../../../../../../../common/types/person';
import ViewKnownFor from '../../../../../../../components/ViewKnownFor';
import { getPersonTabIndex } from '../../../../../common/utils';

const OverviewTabKnownFor: FC = () => {
	const { personQuery, movieCreditsQuery, tvShowCreditsQuery, onSetActiveTab } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name } = person || {};

	const {
		data: movieCredits,
		isFetching: isMovieCreditsFetching,
		isLoading: isMovieCreditsLoading,
		isError: isMovieCreditsError,
		isSuccess: isMovieCreditsSuccess
	} = movieCreditsQuery || {};
	const { cast: movieCastCredits = [], crew: movieCrewCredits = [] } = movieCredits || {};

	const {
		data: tvShowCredits,
		isFetching: isTVShowCreditsFetching,
		isLoading: isTVShowCreditsLoading,
		isError: isTVShowCreditsError,
		isSuccess: isTVShowCreditsSuccess
	} = tvShowCreditsQuery || {};
	const { cast: tvShowCastCredits = [], crew: tvShowCrewCredits = [] } = tvShowCredits || {};

	return (
		<ViewKnownFor
			credits={{
				cast: [
					...movieCastCredits.map((movie) => {
						return { ...movie, media_type: 'movie' };
					}),
					...tvShowCastCredits.map((show) => {
						return { ...show, media_type: 'tv' };
					})
				] as NonNullable<PersonCredits['cast']>,
				crew: [
					...movieCrewCredits.map((movie) => {
						return { ...movie, media_type: 'movie' };
					}),
					...tvShowCrewCredits.map((show) => {
						return { ...show, media_type: 'tv' };
					})
				] as NonNullable<PersonCredits['crew']>
			}}
			title='Known For'
			subtitle={`This list is showcasing all the ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'movie'
			})} & ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'tv'
			})} that ${
				name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}`
			} is most known for`}
			emptyLabel={name ? `${name} known for credits` : 'Known for credits'}
			total={
				movieCastCredits.length + movieCrewCredits.length + tvShowCastCredits.length + tvShowCrewCredits.length
			}
			isFetching={isMovieCreditsFetching || isTVShowCreditsFetching}
			isLoading={isMovieCreditsLoading || isTVShowCreditsLoading}
			isError={isMovieCreditsError && isTVShowCreditsError}
			isSuccess={isMovieCreditsSuccess && isTVShowCreditsSuccess}
			onFooterClick={() => onSetActiveTab({ index: getPersonTabIndex('credits') })}
		/>
	);
};

export default OverviewTabKnownFor;
