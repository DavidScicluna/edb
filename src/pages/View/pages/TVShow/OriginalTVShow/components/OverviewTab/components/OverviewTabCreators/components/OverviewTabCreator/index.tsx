import { FC } from 'react';

import { useMediaTypeQuery } from '../../../../../../../../../../../common/queries';
import OverviewTabKnownFor from '../../../OverviewTabKnownFor';

import { OverviewTabCreatorProps } from './types';

const OverviewTabCreator: FC<OverviewTabCreatorProps> = ({ id }) => {
	const {
		data: person,
		isFetching,
		isLoading,
		isError,
		isSuccess
	} = useMediaTypeQuery<'person'>({
		props: { mediaType: 'person', id: Number(id) }
	});

	return person ? (
		<OverviewTabKnownFor
			person={person}
			type='creator'
			isCreditsFetching={isFetching}
			isCreditsLoading={isLoading}
			isCreditsError={isError}
			isCreditsSuccess={isSuccess}
		/>
	) : null;
};

export default OverviewTabCreator;
