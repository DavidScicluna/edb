import { ReactElement } from 'react';

import { useMediaQuery, useBoolean } from '@chakra-ui/react';

import ClickableImage from '../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../components/Image';
import Skeleton from '../../../../../../../components/Skeleton';
import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { name, path, mediaType, isLoading = false, onClickPoster } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      borderRadius='lg'
      ratio={isSm ? 1 / 1 : 2 / 3}
      isDisabled={isLoading || isImageError}
      onClick={path ? () => onClickPoster(path) : undefined}>
      <Skeleton isLoaded={!isLoading} borderRadius='lg'>
        <Image
          alt={`${name ? `"${name}"` : ''} ${
            mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv show' : 'profile'
          } poster`}
          mediaType={mediaType}
          maxWidth='none'
          height={isSm ? 'auto' : '100%'}
          width={isSm ? '100%' : 'auto'}
          borderRadius='lg'
          onError={() => setIsImageError.on()}
          onLoad={() => setIsImageError.off()}
          src={path || ''}
          size={{
            thumbnail: mediaType === 'person' ? 'w45' : 'w92',
            full: 'original'
          }}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Poster;
