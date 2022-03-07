import { ReactElement } from 'react';
import YouTube, { Options } from 'react-youtube';

import { Box } from '@chakra-ui/react';

import _ from 'lodash';

import { MediaVideoProps } from './types';

import { handleReturnRatio } from '../../../../../../common/utils';
import ClickableImage from '../../../../../../components/Clickable/Image';
import Icon from '../../../../../../components/Icon';
import Skeleton from '../../../../../../components/Skeleton';

import './styles.css';

const width = ['185px', '205px', '230px'];

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

const MediaVideo = (props: MediaVideoProps): ReactElement => {
	const { alt, videoId, isLoading = true, onClick } = props;

	return (
		<Box aria-label={alt} width={width} borderRadius='lg'>
			<ClickableImage
				width='100%'
				ratio={handleReturnRatio('square')}
				borderRadius='lg'
				isDisabled={isLoading || _.isNil(videoId) || _.isEmpty(videoId)} // TODO: Check if is working!
				renderIcon={({ color, fontSize }) => (
					<Icon icon='play_arrow' type='outlined' color={color} fontSize={fontSize} />
				)}
				onClick={onClick}
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

export default MediaVideo;
