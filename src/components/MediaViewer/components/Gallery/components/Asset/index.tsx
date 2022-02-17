import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import { AssetProps } from './types';

import LoadMore from '../../../../../Clickable/LoadMore';
import VerticalGrid from '../../../../../Grid/Vertical';
import Image from '../Image';
import Video from '../Video';

const incrementBy = 8;

const Asset = ({ alt, activeMediaItem, title, data = [], onClick }: AssetProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

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
									isActive={mediaItem.data.file_path === activeMediaItem?.data.file_path}
									onClick={() => onClick(mediaItem)}
								/>
							) : (
								<Video
									key={id}
									alt={alt}
									videoId={mediaItem.data.key}
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
					amount={totalVisible}
					total={data.length}
					label={title || 'Asset Title'}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Asset;
