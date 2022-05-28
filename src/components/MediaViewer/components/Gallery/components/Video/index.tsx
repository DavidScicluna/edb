import { ReactElement } from 'react';

import { Icon } from '@davidscicluna/component-library';
import { Box } from '@chakra-ui/react';

import YouTube, { Options } from 'react-youtube';

import './styles.css';

import { handleReturnRatio } from '../../../../../../common/utils';
import ClickableImage from '../../../../../Clickable/Image';

import { GalleryVideoProps } from './types';

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
	const { alt, videoId, colorMode, isActive = false, onClick } = props;

	return (
		<Box aria-label={alt} borderRadius='lg'>
			<ClickableImage
				borderRadius='lg'
				colorMode={colorMode}
				ratio={handleReturnRatio('square')}
				isActive={isActive}
				renderIcon={({ color, fontSize }) => (
					<Icon icon='play_arrow' category='outlined' color={color} fontSize={fontSize} />
				)}
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
