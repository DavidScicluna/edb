import { FC } from 'react';

import { capitalize } from 'lodash';

import { usePersonCreditsQuery } from '../../../../../../../../../common/queries';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import ViewKnownFor from '../../../../../../../components/ViewKnownFor';
import { ViewKnownForCredits } from '../../../../../../../components/ViewKnownFor/types';
import { useTVShowContext } from '../../../../common/hooks';

import { OverviewTabKnownForProps } from './types';

const OverviewTabKnownFor: FC<OverviewTabKnownForProps> = (props) => {
	const { showQuery } = useTVShowContext();
	const { data: show } = showQuery || {};
	const { id: showID } = show || {};

	const {
		person,
		type,
		isCreditsFetching = false,
		isCreditsLoading = false,
		isCreditsError = false,
		isCreditsSuccess = false
	} = props;
	const { id: personID, name, gender } = person;

	const {
		data: movieCredits,
		isFetching: isMovieCreditsFetching,
		isLoading: isMovieCreditsLoading,
		isError: isMovieCreditsError,
		isSuccess: isMovieCreditsSuccess
	} = usePersonCreditsQuery<'movie'>({
		props: { mediaType: 'movie', id: personID },
		options: { enabled: !!personID }
	});
	const { cast: movieCastCredits = [], crew: movieCrewCredits = [] } = movieCredits || {};

	const {
		data: tvShowCredits,
		isFetching: isTVShowCreditsFetching,
		isLoading: isTVShowCreditsLoading,
		isError: isTVShowCreditsError,
		isSuccess: isTVShowCreditsSuccess
	} = usePersonCreditsQuery<'tv'>({
		props: { mediaType: 'tv', id: personID },
		options: { enabled: !!personID }
	});
	const { cast: tvShowCastCredits = [], crew: tvShowCrewCredits = [] } = tvShowCredits || {};

	const label = capitalize(type === 'actor' ? (gender === 1 ? 'Actress' : 'Actor') : type);

	return (
		<ViewKnownFor
			credits={{
				cast: [
					...movieCastCredits.map((movie) => {
						return { ...movie, media_type: 'movie' };
					}),
					...tvShowCastCredits
						.filter((show) => show.id !== showID)
						.map((show) => {
							return { ...show, media_type: 'tv' };
						})
				] as ViewKnownForCredits,
				crew: [
					...movieCrewCredits.map((movie) => {
						return { ...movie, media_type: 'movie' };
					}),
					...tvShowCrewCredits
						.filter((show) => show.id !== showID)
						.map((show) => {
							return { ...show, media_type: 'tv' };
						})
				] as ViewKnownForCredits
			}}
			title={name ? `More from ${name} the ${label}` : `More from the ${label}`}
			subtitle={`This list is showcasing some of the ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'movie'
			})} & ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'tv'
			})} that ${name ? name : `the ${label}`} is most known for`}
			emptyLabel={name ? `${name} known for credits` : `${label} known for credits`}
			isFetching={isCreditsFetching || isMovieCreditsFetching || isTVShowCreditsFetching}
			isLoading={isCreditsLoading || isMovieCreditsLoading || isTVShowCreditsLoading}
			isError={isCreditsError && (isMovieCreditsError || isTVShowCreditsError)}
			isSuccess={isCreditsSuccess && (isMovieCreditsSuccess || isTVShowCreditsSuccess)}
		/>
	);
};

export default OverviewTabKnownFor;
