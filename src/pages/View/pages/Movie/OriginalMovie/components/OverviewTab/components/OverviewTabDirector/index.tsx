import { FC } from 'react';

import { useMovieContext } from '../../../../common/hooks';
import OverviewTabKnownFor from '../OverviewTabKnownFor';

const OverviewTabDirector: FC = () => {
	const { creditsQuery } = useMovieContext();

	const {
		data: credits,
		isFetching: isCreditsFetching,
		isLoading: isCreditsLoading,
		isError: isCreditsError,
		isSuccess: isCreditsSuccess
	} = creditsQuery || {};
	const { crew: crewCredits = [] } = credits || {};

	const director = crewCredits.find(({ job }) => job === 'Director');

	return director ? (
		<OverviewTabKnownFor
			person={director}
			type='director'
			isCreditsFetching={isCreditsFetching}
			isCreditsLoading={isCreditsLoading}
			isCreditsError={isCreditsError}
			isCreditsSuccess={isCreditsSuccess}
		/>
	) : null;
};

export default OverviewTabDirector;
