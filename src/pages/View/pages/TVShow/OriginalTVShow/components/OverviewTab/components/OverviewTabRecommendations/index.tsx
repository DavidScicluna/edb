import { FC } from 'react';

import { useTVShowContext } from '../../../../common/hooks';
import ViewRecommendations from '../../../../../../../components/ViewRecommendations/OriginalViewRecommendations';

const OverviewTabRecommendations: FC = () => {
	const { showQuery } = useTVShowContext();

	const { data: show } = showQuery || {};

	return <ViewRecommendations mediaType='tv' mediaItem={show} />;
};

export default OverviewTabRecommendations;
