import { ReactElement } from 'react';

import { useBoolean, Box } from '@chakra-ui/react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import YouTube, { Options } from 'react-youtube';

import ClickableImage from '../../../../../../../../../../../components/Clickable/Image';
import Skeleton from '../../../../../../../../../../../components/Skeleton';
import { VideoProps } from './types';
import './styles.css';

const width = ['185px', '205px', '230px'];

const Video = (props: VideoProps): ReactElement => {
  const { video, isLoading = false, onClick } = props;

  const [isHovering, setIsHovering] = useBoolean();
  const [isError, setIsError] = useBoolean();

  const opts: Options = {
    playerVars: {
      autoplay: isHovering ? 1 : 0,
      controls: 0,
      enablejsapi: 1,
      disablekb: 1,
      mute: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      showinfo: 0
    }
  };

  return (
    <Box
      width={width}
      borderRadius='base'
      onMouseEnter={() => setIsHovering.on()}
      onMouseLeave={() => setIsHovering.off()}>
      <ClickableImage
        width={width}
        borderRadius='base'
        ratio={1 / 1}
        icon={<PlayArrowIcon />}
        isDisabled={isError || isLoading}
        onClick={typeof video !== 'number' && video ? () => onClick(video.key, 'video') : undefined}>
        <Skeleton isLoaded={!isLoading} borderRadius='base'>
          <YouTube
            videoId={typeof video !== 'number' && video ? video?.key : ''}
            className='VideoGalleryFrame'
            containerClassName='VideoGalleryContainer'
            onError={() => setIsError.on()}
            opts={opts}
          />
        </Skeleton>
      </ClickableImage>
    </Box>
  );
};

export default Video;
