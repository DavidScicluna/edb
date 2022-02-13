import { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import _ from 'lodash';
import YouTube, { Options } from 'react-youtube';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { AssetVideoProps } from './types';
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
    <Box width='100%' alt={`${alt ? `"${alt}"` : ''} video`} borderRadius='lg'>
      <ClickableImage
        width='100%'
        ratio={1 / 1}
        borderRadius='lg'
        isDisabled={isLoading || _.isNil(videoId) || _.isEmpty(videoId)}
        renderIcon={({ color, fontSize }) => <PlayArrowIcon style={{ color, fontSize }} />}
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