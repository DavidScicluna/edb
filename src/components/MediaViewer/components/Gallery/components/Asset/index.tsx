import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';


import { useSelector } from '../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import LoadMore from '../../../../../Clickable/LoadMore';
import VerticalGrid from '../../../../../Grid/Vertical';
import Image from '../Image';
import Video from '../Video';

import { AssetProps } from './types';

const incrementBy = 8;

const Asset = (props: AssetProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { alt, activeMediaItem, colorMode, title, data = [], onClick } = props;

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalGrid columns={[1, 2, 3, 3, 4, 5]} displayMode='grid'>
				{() =>
					data
						.filter((_mediaItem, index) => index < totalVisible)
						.map((mediaItem, id) =>
							mediaItem.type === 'image' ? (
								<Image
									key={id}
									alt={alt}
									ratio={mediaItem.data.aspect_ratio}
									path={mediaItem.data.file_path}
									boringType={mediaItem.boringType}
									srcSize={mediaItem.srcSize}
									colorMode={colorMode}
									isActive={mediaItem.data.file_path === activeMediaItem?.data.file_path}
									onClick={() => onClick(mediaItem)}
								/>
							) : (
								<Video
									key={id}
									alt={alt}
									videoId={mediaItem.data.key}
									colorMode={colorMode}
									isActive={mediaItem.data.key === activeMediaItem?.data.key}
									onClick={() => onClick(mediaItem)}
								/>
							)
						)
				}
			</VerticalGrid>

			<ScaleFade
				in={data.length > 0 && data.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					color={color}
					amount={totalVisible}
					total={data.length}
					label={title || 'Asset Title'}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
					buttonProps={{ colorMode }}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Asset;
