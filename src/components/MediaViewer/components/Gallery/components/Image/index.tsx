
import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import { GalleryImageProps } from './types';

import ClickableImage from '../../../../../Clickable/Image';
import Image from '../../../../../Image';

const GalleryImage = (props: GalleryImageProps): ReactElement => {
  const { alt = '', ratio, path, boringType, srcSize, isActive = false, onClick } = props;

  const [isError, setIsError] = useBoolean();

  return (
    <ClickableImage
      width='100%'
      ratio={ratio}
      borderRadius='lg'
      isActive={isActive}
      isDisabled={isError || _.isNil(path) || _.isEmpty(path)}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClick}
    >
      <Image
        alt={alt}
        borderRadius='lg'
        boringType={boringType}
        onLoad={() => setIsError.off()}
        onError={() => setIsError.on()}
        thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${path}`}
        fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${path}`}
      />
    </ClickableImage>
  );
};

export default GalleryImage;
