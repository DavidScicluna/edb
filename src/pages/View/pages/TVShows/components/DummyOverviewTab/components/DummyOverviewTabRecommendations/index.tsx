import { FC } from 'react';

import DummyViewRecommendations from '../../../../../../components/ViewRecommendations/DummyViewRecommendations';

const DummyOverviewTabRecommendations: FC = () => {
	return <DummyViewRecommendations<'tv'> mediaType='tv' />;
};

export default DummyOverviewTabRecommendations;
