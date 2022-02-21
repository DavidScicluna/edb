import { ReactElement } from 'react';
import YouTube, { Options } from 'react-youtube';

import { Box } from '@chakra-ui/react';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import './styles.css';

import { GalleryVideoProps } from './types';

import { handleReturnRatio } from '../../../../../../common/utils';
import ClickableImage from '../../../../../Clickable/Image';

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

const GalleryVideo = (props: GalleryVideoProps): ReactElement => {
	const { alt, videoId, isActive = false, onClick } = props;

	return (
		<Box aria-label={alt} borderRadius='lg'>
			<ClickableImage
				borderRadius='lg'
				ratio={handleReturnRatio('square')}
				isActive={isActive}
				renderIcon={({ color, fontSize }) => <PlayArrowIcon style={{ color, fontSize }} />}
				onClick={onClick}
			>
				<YouTube
					videoId={videoId}
					className='VideoGalleryFrame'
					containerClassName='VideoGalleryContainer'
					opts={opts}
				/>
			</ClickableImage>
		</Box>
	);
};

export default GalleryVideo;