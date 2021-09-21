import { ReactElement } from 'react';

import YouTube from 'react-youtube';

import { VideoViewerProps } from './types';

import './styles.css';

const VideoViewer = (props: VideoViewerProps): ReactElement => {
  const { path } = props;

  return <YouTube videoId={path} className='VideoViewerFrame' containerClassName='VideoViewerContainer' />;
};

export default VideoViewer;
