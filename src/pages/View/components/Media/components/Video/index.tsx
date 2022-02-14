import { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import _ from 'lodash';
import YouTube, { Options } from 'react-youtube';

import { handleReturnRatio } from '../../../../../../common/utils';
import ClickableImage from '../../../../../../components/Clickable/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { MediaVideoProps } from './types';

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
    <Box width={width} borderRadius='lg'>
      <ClickableImage
        width='100%'
        ratio={handleReturnRatio('square')}
        borderRadius='lg'
        isDisabled={isLoading || _.isNil(videoId) || _.isEmpty(videoId)}
        renderIcon={({ color, fontSize }) => <PlayArrowIcon style={{ color, fontSize }} />}
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
