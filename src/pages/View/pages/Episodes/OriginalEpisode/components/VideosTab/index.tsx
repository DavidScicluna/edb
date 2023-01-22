import { FC } from 'react';

import { useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { range, shuffle } from 'lodash';

import { TotalBadge, VerticalGrid } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import { useEpisodeContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import EpisodeError from '../EpisodeError';
import EpisodeEmpty from '../EpisodeEmpty';
import DummyVideo from '../../../../../components/ViewVideos/components/ViewVideosDummyVideo';
import Video from '../../../../../components/ViewVideos/components/ViewVideosVideo';
import { ViewVideosVideos } from '../../../../../components/ViewVideos/common/types';

const VideosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { episodeQuery, videosQuery } = useEpisodeContext();

	const { data: episode } = episodeQuery || {};
	const { name, episode_number: number } = episode || {};

	const { data: videos, isFetching, isLoading, isError, isSuccess, refetch } = videosQuery || {};
	const { results = [] } = videos || {};

	const videosDebounced = useDebounce<ViewVideosVideos>(shuffle([...results]), 'slow');

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							name
								? ['Episode', number, `"${name}"`].join(' ')
								: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode`
						} has a total of`}
						suffix={`Video${videosDebounced.length === 1 ? '' : 's'}`}
						total={videosDebounced.length || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Videos</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the trailers, teasers & featurettes that were created for ${
							name
								? ['Episode', number, `"${name}"`].join(' ')
								: `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode`
						}`}
					</Text>
				)}
				py={spacing * 2}
			/>

			<Center width='100%'>
				{!(isFetching || isLoading) && isError ? (
					<EpisodeError
						label={
							name
								? ['Episode', number, `"${name}"`, 'Videos'].join(' ')
								: `${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
								  })} Episode Videos`
						}
						refetch={refetch}
					/>
				) : !(isFetching || isLoading) && isSuccess && videosDebounced.length === 0 ? (
					<EpisodeEmpty
						label={
							name
								? ['Episode', number, `"${name}"`, 'Videos'].join(' ')
								: `${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
								  })} Episode Videos`
						}
					/>
				) : !(isFetching || isLoading) && isSuccess && videosDebounced.length > 0 ? (
					<VerticalGrid displayMode='grid'>
						{() =>
							videosDebounced.map((video, index) => (
								<Video key={video.key} mediaType='tv' index={index} video={video} />
							))
						}
					</VerticalGrid>
				) : (
					<VerticalGrid displayMode='grid'>
						{() => range(5).map((_dummy, index) => <DummyVideo key={index} />)}
					</VerticalGrid>
				)}
			</Center>
		</VStack>
	);
};

export default VideosTab;
