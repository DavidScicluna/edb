import { ReactElement } from 'react';
import YouTube, { Options } from 'react-youtube';

import { Box } from '@chakra-ui/react';

import { isNil, isEmpty } from 'lodash';

import { AssetVideoProps } from './types';

import { handleReturnRatio } from '../../../../../../common/utils';
import ClickableImage from '../../../../../../components/Clickable/Image';
import Icon from '../../../../../../components/Icon';
import Skeleton from '../../../../../../components/Skeleton';

import './styles.css';

const opts: Options = {
	playerVars: {
		autoplay: 0,
		controls: 0,
		color: 'white',
		enablejsapi: 1,
		disablekb: 1,
		mute: 1,
		fs: 0,
		loop: 1,
		modestbranding: 1,
		showinfo: 0
	}
};

const AssetVideo = (props: AssetVideoProps): ReactElement => {
	const { alt, videoId, isLoading = true, onClickVideo } = props;

	return (
		<Box aria-label={alt} width='100%' borderRadius='lg'>
			<ClickableImage
				width='100%'
				ratio={handleReturnRatio('square')}
				borderRadius='lg'
				isDisabled={isLoading || isNil(videoId) || isEmpty(videoId)} // TODO: Check if is working!
				renderIcon={({ color, fontSize }) => (
					<Icon icon='play_arrow' type='outlined' color={color} fontSize={fontSize} />
				)}
				onClick={onClickVideo && videoId ? () => onClickVideo(videoId) : undefined}
			>
				<Skeleton borderRadius='lg' isLoaded={!isLoading}>
					<YouTube
						videoId={videoId}
						className='VideoGalleryFrame'
						containerClassName='VideoGalleryContainer'
						opts={opts}
					/>
				</Skeleton>
			</ClickableImage>
		</Box>
	);
};

export default AssetVideo;
