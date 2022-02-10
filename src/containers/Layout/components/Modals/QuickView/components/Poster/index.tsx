import { ReactElement } from 'react';

import { useMediaQuery, useBoolean } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { handleReturnBoringTypeByMediaType } from '../../../../../../../common/utils';
import ClickableImage from '../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../components/Image';
import Skeleton from '../../../../../../../components/Skeleton';
import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { alt, path, mediaType, srcSize, isLoading = false, onClickPoster } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      borderRadius='lg'
      ratio={isSm ? 1 / 1 : 2 / 3}
      isDisabled={isLoading || isImageError}
      renderIcon={({ fontSize }) => <SearchOutlinedIcon style={{ fontSize }} />}
      onClick={path ? () => onClickPoster(path) : undefined}
    >
      <Skeleton isLoaded={!isLoading} borderRadius='lg'>
        <Image
          alt={`${alt ? `"${alt}"` : ''} ${mediaType === 'tv' ? 'tv show' : mediaType} poster`}
          // height='auto'
          // width='100%'
          borderRadius='lg'
          boringType={handleReturnBoringTypeByMediaType(mediaType)}
          onError={() => setIsImageError.on()}
          onLoad={() => setIsImageError.off()}
          thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${path}`}
          fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${path}`}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Poster;
