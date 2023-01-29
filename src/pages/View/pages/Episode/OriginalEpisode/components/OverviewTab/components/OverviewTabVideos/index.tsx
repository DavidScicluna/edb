import { FC, useState, useEffect } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { shuffle } from 'lodash';

import ViewVideos from '../../../../../../../components/ViewVideos/ViewVideosHorizontalGrid/OriginalViewVideosHorizontalGrid';
import { ViewVideosVideos } from '../../../../../../../components/ViewVideos/common/types';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { useEpisodeContext } from '../../../../common/hooks';
import { getEpisodeTabIndex } from '../../../../../common/utils';

const OverviewTabVideos: FC = () => {
	const { episodeQuery, videosQuery, onSetActiveTab } = useEpisodeContext();

	const { data: episode } = episodeQuery || {};
	const { name, episode_number: number } = episode || {};

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
				name
					? ['Episode', number, `"${name}"`].join(' ')
					: `${formatMediaTypeLabel({
							type: 'single',
							mediaType: 'tv'
					  })} Episode`
			}`}
			emptyLabel={name ? `${name} videos` : 'Videos'}
			total={results.length}
			isLoading={isFetching || isLoading}
			isError={isError}
			isSuccess={isSuccess}
			onFooterClick={() => onSetActiveTab({ index: getEpisodeTabIndex('videos') })}
		/>
	);
};

export default OverviewTabVideos;
