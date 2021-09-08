import React, { ReactElement } from 'react';

import { useBoolean, Box } from '@chakra-ui/react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import YouTube, { Options } from 'react-youtube';

import ClickableImage from '../../../../../Clickable/Image';
import { VideoProps } from './types';

const Video = (props: VideoProps): ReactElement => {
  const { video, isActive = false, onClickVideo } = props;

  const [isHovering, setIsHovering] = useBoolean();

  const opts: Options = {
    playerVars: {
      autoplay: isHovering ? 1 : 0,
      controls: 0,
      disablekb: 1,
      mute: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1
      // playsinline: 1
    }
  };

  return (
    <Box
      borderRadius='lg'
      onMouseEnter={!isActive ? () => setIsHovering.on() : undefined}
      onMouseLeave={!isActive ? () => setIsHovering.off() : undefined}>
      <ClickableImage
        borderRadius='lg'
        ratio={1 / 1}
        icon={PlayArrowIcon}
        isActive={isActive}
        onClick={() => onClickVideo(video.key, 'video')}>
        <YouTube videoId={video.key} opts={opts} />
      </ClickableImage>
    </Box>
  );
};

export default Video;
