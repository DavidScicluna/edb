import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, useBoolean } from '@chakra-ui/react';

import ClickableImage from '../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../components/Image';
import Skeleton from '../../../../../../../components/Skeleton';
import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { name, path, isLoading = false, isError = false, onClickPoster } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      width={isSm ? '100%' : ['125px', '125px', '175px', '225px', '275px', '325px']}
      border={isSm ? 'none' : '4px'}
      borderColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderRadius={isSm ? 'base' : 'full'}
      ratio={1 / 1}
      isDisabled={isLoading || isError || isImageError}
      onClick={path ? () => onClickPoster(path) : undefined}>
      <Skeleton isLoaded={!isLoading} borderRadius={isSm ? 'base' : 'full'}>
        <Image
          width='100%'
          alt={`${name ? `"${name}"` : ''} profile poster`}
          mediaType='person'
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

export default Poster;
