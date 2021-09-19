import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import YouTubeIcon from '@material-ui/icons/YouTube';

import ClickableImage from '../../../../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../../../components/Skeleton';
import { BackdropProps } from './types';

const Backdrop = (props: BackdropProps): ReactElement => {
  const { title, path, video = true, isLoading = false, isError = false, onClick } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      width='100%'
      borderRadius='base'
      ratio={6 / 3}
      icon={video ? YouTubeIcon : undefined}
      isDisabled={isLoading || isError || isImageError}
      onClick={path ? () => onClick(path, video ? 'video' : 'backdrop') : undefined}>
      <Skeleton width='100%' position='absolute' top={0} isLoaded={!isLoading} borderRadius='base'>
        <Image
          width='100%'
          alt={`${title ? `"${title}"` : ''} movie backdrop`}
          borderRadius='base'
          mediaType='movie'
          onError={() => setIsImageError.on()}
          onLoad={() => setIsImageError.off()}
          src={path || ''}
          size={{
            thumbnail: 'w300',
            full: 'original'
          }}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Backdrop;
