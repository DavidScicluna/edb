import { FC } from 'react';

import { useMovieContext } from '../../../../common/hooks';
import ViewRecommendations from '../../../../../../../components/ViewRecommendations/OriginalViewRecommendations';

const OverviewTabRecommendations: FC = () => {
	const { movieQuery } = useMovieContext();

	const { data: movie } = movieQuery || {};

	return <ViewRecommendations mediaType='movie' mediaItem={movie} />;
};

export default OverviewTabRecommendations;
