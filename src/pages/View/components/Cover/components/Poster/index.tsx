import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
  const { title, path, isLoading = false, isError = false, onClick } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      width='100%'
      borderRadius='base'
      isDisabled={isLoading || isError || isImageError}
      onClick={path ? () => onClick(path, 'photo') : undefined}
    >
      <Skeleton isLoaded={!isLoading} borderRadius='base'>
        <Image
          alt={`${title ? `"${title}"` : ''} movie poster`}
          height='100%'
          maxWidth='none'
          borderRadius='base'
          mediaType='movie'
          onError={() => setIsImageError.on()}
          onLoad={() => setIsImageError.off()}
          thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w92${path}`}
          fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${path}`}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Poster;
