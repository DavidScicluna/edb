import { FC } from 'react';

import { useMovieContext } from '../../../../common/hooks';
import OverviewTabKnownFor from '../OverviewTabKnownFor';

const OverviewTabTopActor: FC = () => {
	const { creditsQuery } = useMovieContext();

	const {
		data: credits,
		isFetching: isCreditsFetching,
		isLoading: isCreditsLoading,
		isError: isCreditsError,
		isSuccess: isCreditsSuccess
	} = creditsQuery || {};
	const { cast: castCredits = [] } = credits || {};

	const actor = castCredits && castCredits[0] ? castCredits[0] : undefined;

	return actor ? (
		<OverviewTabKnownFor
			person={actor}
			type='actor'
			isCreditsFetching={isCreditsFetching}
			isCreditsLoading={isCreditsLoading}
			isCreditsError={isCreditsError}
			isCreditsSuccess={isCreditsSuccess}
		/>
	) : null;
};

export default OverviewTabTopActor;
