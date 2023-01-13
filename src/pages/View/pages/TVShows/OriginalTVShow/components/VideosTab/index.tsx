import { FC } from 'react';

import { useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { shuffle } from 'lodash';

import { TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import { useTVShowContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewVideos from '../../../../../components/ViewVideos/ViewVideosVerticalGrid/OriginalViewVideosVerticalGrid';
import { ViewVideosVideos } from '../../../../../components/ViewVideos/common/types';

const VideosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { showQuery, videosQuery } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { name } = show || {};

	const { data: videos, isFetching, isLoading, isError, isSuccess, error, refetch } = videosQuery || {};
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
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })
						} has a total of`}
						suffix={`Video${results.length === 1 ? '' : 's'}`}
						total={videosDebounced.length || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Videos</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the trailers, teasers & featurettes that were created for ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						}`}
					</Text>
				)}
				py={spacing * 2}
			/>

			<ViewVideos
				mediaType='tv'
				videos={videosDebounced}
				name={name}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
				isSuccess={isSuccess}
				error={error}
				refetch={refetch}
			/>
		</VStack>
	);
};

export default VideosTab;
