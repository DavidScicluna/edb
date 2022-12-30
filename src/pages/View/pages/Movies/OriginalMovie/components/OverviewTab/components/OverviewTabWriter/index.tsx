import { FC } from 'react';

import { useMovieContext } from '../../../../common/hooks';
import OverviewTabKnownFor from '../OverviewTabKnownFor';

const OverviewTabWriter: FC = () => {
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
	const writer = crewCredits.find(({ job }) => job === 'Writer');

	return writer && director?.id !== writer.id ? (
		<OverviewTabKnownFor
			person={writer}
			type='writer'
			isCreditsFetching={isCreditsFetching}
			isCreditsLoading={isCreditsLoading}
			isCreditsError={isCreditsError}
			isCreditsSuccess={isCreditsSuccess}
		/>
	) : null;
};

export default OverviewTabWriter;
