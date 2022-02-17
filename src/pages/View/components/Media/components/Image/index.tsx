import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import { MediaImageProps } from './types';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';

const posterWidth = ['185px', '205px', '230px'];
const backdropLogoWidth = ['330px', '355px', '380'];

const MediaImage = (props: MediaImageProps): ReactElement => {
  const { alt = '', path, ratio, type, boringType, isLoading = true, onClick } = props;

  const [isError, setIsError] = useBoolean();

  const handleReturnImageSize = (srcType: 'thumbnail' | 'full'): string => {
    switch (type) {
      case 'poster':
        return srcType === 'thumbnail' ? 'w92' : 'original';
      case 'backdrop':
        return srcType === 'thumbnail' ? 'w300' : 'original';
      default:
        return '';
    }
  };

  return (
    <ClickableImage
      width={type === 'poster' ? posterWidth : backdropLogoWidth}
      ratio={ratio}
      borderRadius='lg'
      isDisabled={isLoading || isError || _.isNil(path) || _.isEmpty(path)}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClick}
    >
      <Skeleton borderRadius='lg' isLoaded={!isLoading}>
        <Image
          alt={alt}
          borderRadius='lg'
          boringType={boringType}
          onLoad={() => setIsError.off()}
          onError={() => setIsError.on()}
          thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${handleReturnImageSize('thumbnail')}${path}`}
          fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${handleReturnImageSize('full')}${path}`}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default MediaImage;
