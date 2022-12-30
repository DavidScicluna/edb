import { FC } from 'react';

import DummyViewRecommendations from '../../../../../../components/ViewRecommendations/DummyViewRecommendations';

const DummyOverviewTabRecommendations: FC = () => {
	return <DummyViewRecommendations<'movie'> mediaType='movie' />;
};

export default DummyOverviewTabRecommendations;
