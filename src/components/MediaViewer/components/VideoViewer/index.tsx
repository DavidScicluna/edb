import { ReactElement } from 'react';

import { useMediaQuery, AspectRatio } from '@chakra-ui/react';
import YouTube from 'react-youtube';

import { handleReturnRatio } from '../../../../common/utils';

import { VideoViewerProps } from './types';

import './styles.css';

const VideoViewer = ({ videoId }: VideoViewerProps): ReactElement => {
	const [isLg] = useMediaQuery('(min-width: 1280px)');

	return (
		<AspectRatio width={isLg ? '85%' : '100%'} height='auto' ratio={handleReturnRatio('landscape')}>
			<YouTube videoId={videoId} className='VideoViewerFrame' containerClassName='VideoViewerContainer' />
		</AspectRatio>
	);
};

export default VideoViewer;
