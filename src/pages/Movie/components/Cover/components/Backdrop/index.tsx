import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import YouTubeIcon from '@material-ui/icons/YouTube';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { BackdropProps } from './types';

const Backdrop = (props: BackdropProps): ReactElement => {
  const { title, path, isLoading = false, isError = false, onClick } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      width='100%'
      borderRadius='xl'
      ratio={6 / 3}
      icon={YouTubeIcon}
      isDisabled={isLoading || isError || isImageError}
      onClick={path ? () => onClick(path, 'backdrop') : undefined}>
      <Skeleton width='100%' position='absolute' top={0} isLoaded={!isLoading} borderRadius='xl'>
        <Image
          width='100%'
          alt={`${title ? `"${title}"` : ''} movie poster`}
          mediaType='movie'
          onError={() => setIsImageError.on()}
          onLoad={() => setIsImageError.off()}
          src={path || ''}
          size={{
            thumbnail: 'w45',
            full: 'original'
          }}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Backdrop;
