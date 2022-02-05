import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import ClickableImage from '../../../../../Clickable/Image';
import Image from '../../../../../Image';
import { GalleryImageProps } from './types';

const GalleryImage = (props: GalleryImageProps): ReactElement => {
  const { alt = '', boringType, path, srcSize, isActive = false, onClick } = props;

  const [isError, setIsError] = useBoolean();

  return (
    <ClickableImage
      ratio={1 / 1}
      borderRadius='lg'
      isActive={isActive}
      isDisabled={isError || _.isNil(path) || _.isEmpty(path)}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClick}
    >
      <Image
        width='100%'
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
