import { ReactElement } from 'react';

import { AspectRatio } from '@chakra-ui/react';
import YouTube from 'react-youtube';

import { VideoViewerProps } from './types';

import './styles.css';

const VideoViewer = (props: VideoViewerProps): ReactElement => {
  const { videoId } = props;

  return (
    <AspectRatio width='100%' ratio={1.77777777777778}>
      <YouTube videoId={videoId} className='VideoViewerFrame' containerClassName='VideoViewerContainer' />
    </AspectRatio>
  );
};

export default VideoViewer;
