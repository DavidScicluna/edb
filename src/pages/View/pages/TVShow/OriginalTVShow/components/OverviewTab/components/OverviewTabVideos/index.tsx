import { FC, useState, useEffect } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { shuffle } from 'lodash';

import ViewVideos from '../../../../../../../components/ViewVideos/ViewVideosHorizontalGrid/OriginalViewVideosHorizontalGrid';
import { ViewVideosVideos } from '../../../../../../../components/ViewVideos/common/types';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { useTVShowContext } from '../../../../common/hooks';
import { getTVShowTabIndex } from '../../../../../common/utils';

const OverviewTabVideos: FC = () => {
	const { showQuery, videosQuery, onSetActiveTab } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { name } = show || {};

	const { data: videos, isFetching, isLoading, isError, isSuccess } = videosQuery || {};
	const { results = [] } = videos || {};

	const [shuffled, setShuffled] = useState<ViewVideosVideos>([]);
	const photosDebounced = useDebounce<ViewVideosVideos>(shuffled, 'slow');

	useEffect(() => {
		setShuffled(shuffle([...results.filter((_poster, index) => index < 10)]));
	}, [results]);

	return (
		<ViewVideos
			mediaType='tv'
			videos={[...photosDebounced]}
			title='Videos'
			subtitle={`This list is showcasing some of the trailers, teasers & featurettes that were created for ${
				name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
			}`}
			emptyLabel={name ? `${name} videos` : 'Videos'}
			total={results.length}
			isLoading={isFetching || isLoading}
			isError={isError}
			isSuccess={isSuccess}
			onFooterClick={() => onSetActiveTab({ index: getTVShowTabIndex('videos') })}
		/>
	);
};

export default OverviewTabVideos;
