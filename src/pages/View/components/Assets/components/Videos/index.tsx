import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import range from 'lodash/range';


import { useSelector } from '../../../../../../common/hooks';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import Video from '../Video';

import { VideosProps } from './types';

const incrementBy = 5;

const Videos = (props: VideosProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { alt, videos = [], isLoading = true, isError = false, isSuccess = false, onClickVideo } = props;

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${alt ? `"${alt}"` : ''} videos list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && videos && videos.length === 0 ? (
				<Empty label={`${alt ? `"${alt}" videos` : 'Videos'} list is currently empty!`} variant='transparent' />
			) : !isLoading && isSuccess && videos && videos.length > 0 ? (
				<VerticalGrid displayMode='grid'>
					{() =>
						videos
							.filter((_video, index) => index < totalVisible)
							.map((video, index: number) => (
								<Video
									key={index}
									alt={alt}
									videoId={video.key}
									isLoading={false}
									onClickVideo={onClickVideo}
								/>
							))
					}
				</VerticalGrid>
			) : (
				<VerticalGrid displayMode='grid'>
					{() =>
						range(0, isSuccess && videos && videos.length > 0 ? videos.length : 20).map(
							(_dummy, index: number) => <Video key={index} alt={alt} isLoading />
						)
					}
				</VerticalGrid>
			)}

			<ScaleFade
				in={videos.length > 0 && videos.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					color={color}
					amount={totalVisible}
					total={videos.length}
					label={alt ? `"${alt}" videos` : 'Videos'}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Videos;
