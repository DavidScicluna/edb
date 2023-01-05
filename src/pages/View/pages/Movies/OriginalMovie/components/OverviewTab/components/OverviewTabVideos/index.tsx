import { FC, useState, useEffect } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { shuffle } from 'lodash';

import { useMovieContext } from '../../../../common/hooks';
import ViewVideos from '../../../../../../../components/ViewVideos/ViewVideosHorizontalGrid/OriginalViewVideosHorizontalGrid';
import { ViewVideosVideos } from '../../../../../../../components/ViewVideos/common/types';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { getMovieTabIndex } from '../../../../../common/utils';

const OverviewTabVideos: FC = () => {
	const { movieQuery, videosQuery, onSetActiveTab } = useMovieContext();
	const { data: movie } = movieQuery || {};
	const { title } = movie || {};
	const { data: videos, isFetching, isLoading, isError, isSuccess } = videosQuery || {};
	const { results = [] } = videos || {};

	const [shuffled, setShuffled] = useState<ViewVideosVideos>([]);
	const photosDebounced = useDebounce<ViewVideosVideos>(shuffled, 'slow');

	useEffect(() => {
		setShuffled(shuffle([...results.filter((_poster, index) => index < 10)]));
	}, [results]);

	return (
		<ViewVideos
			mediaType='movie'
			videos={[...photosDebounced]}
			title='Videos'
			subtitle={`This list is showcasing some of the trailers, teasers & featurettes that were created for ${
				title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
			}`}
			emptyLabel={title ? `${title} videos` : 'Videos'}
			total={results.length}
			isLoading={isFetching || isLoading}
			isError={isError}
			isSuccess={isSuccess}
			onFooterClick={() => onSetActiveTab({ index: getMovieTabIndex('videos') })}
		/>
	);
};

export default OverviewTabVideos;
