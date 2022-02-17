import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


import { PosterProps } from './types';

import { handleReturnBoringTypeByMediaType } from '../../../../../../../../common/utils';
import ClickableImage from '../../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../components/Skeleton';

const Poster = (props: PosterProps): ReactElement => {
  const { alt, path, mediaType, isLoading = false, isError = false, onClick } = props;

  const [isImageError, setIsImageError] = useBoolean();

  return (
    <ClickableImage
      width='100%'
      borderRadius='lg'
      isDisabled={isLoading || isError || isImageError}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={path ? () => onClick(path) : undefined}
    >
      <Skeleton borderRadius='lg' isLoaded={!isLoading}>
        <Image
          alt={`${alt ? `"${alt}"` : ''} ${mediaType} poster`}
          // height='100%'
          // maxWidth='none'
          borderRadius='lg'
          boringType={handleReturnBoringTypeByMediaType(mediaType === 'movie' ? 'movie' : 'tv')}
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
