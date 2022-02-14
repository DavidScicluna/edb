import { ReactElement } from 'react';

import { AspectRatio } from '@chakra-ui/react';
import YouTube from 'react-youtube';

import { handleReturnRatio } from '../../../../common/utils';
import { VideoViewerProps } from './types';

import './styles.css';

const VideoViewer = (props: VideoViewerProps): ReactElement => {
  const { videoId } = props;

  return (
    <AspectRatio width='100%' ratio={handleReturnRatio('landscape')}>
      <YouTube videoId={videoId} className='VideoViewerFrame' containerClassName='VideoViewerContainer' />
    </AspectRatio>
  );
};

export default VideoViewer;
