import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import YouTubeIcon from '@material-ui/icons/YouTube';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { BackdropProps } from './types';

const Backdrop = (props: BackdropProps): ReactElement => {
  const { title, path, video = true, isLoading = false, isError = false, onClick } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      width='100%'
      borderRadius='base'
      ratio={6 / 3}
      renderIcon={video ? ({ color, fontSize }) => <YouTubeIcon style={{ color, fontSize }} /> : undefined}
      isDisabled={isLoading || isError || isImageError}
      onClick={path ? () => onClick(path, video ? 'video' : 'backdrop') : undefined}
    >
      <Skeleton width='100%' position='absolute' top={0} isLoaded={!isLoading} borderRadius='base'>
        <Image
          width='100%'
          alt={`${title ? `"${title}"` : ''} movie backdrop`}
          borderRadius='base'
          mediaType='movie'
          onError={() => setIsImageError.on()}
          onLoad={() => setIsImageError.off()}
          thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w300${path}`}
          fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${path}`}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Backdrop;
