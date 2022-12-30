import { FC } from 'react';

import { useMovieContext } from '../../../../common/hooks';
import ViewSimilar from '../../../../../../../components/ViewSimilar/OriginalViewSimilar';

const OverviewTabSimilar: FC = () => {
	const { movieQuery } = useMovieContext();

	const { data: movie } = movieQuery || {};

	return <ViewSimilar mediaType='movie' mediaItem={movie} />;
};

export default OverviewTabSimilar;
