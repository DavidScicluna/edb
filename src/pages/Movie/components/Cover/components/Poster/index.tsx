import React, { ReactElement } from 'react';

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
      borderRadius='xl'
      ratio={2 / 3}
      isDisabled={isLoading || isError || isImageError}
      onClick={path ? () => onClick(path, 'photo') : undefined}>
      <Skeleton isLoaded={!isLoading} borderRadius='xl'>
        <Image
          height='100%'
          maxWidth='none'
          alt={`${title ? `"${title}"` : ''} movie poster`}
          mediaType='movie'
          onError={() => setIsImageError.on()}
          onLoad={() => setIsImageError.off()}
          src={path || ''}
          size={{
            thumbnail: 'w92',
            full: 'original'
          }}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Poster;
