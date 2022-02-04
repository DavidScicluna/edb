import { ReactElement } from 'react';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import ClickableImage from '../../../../../Clickable/Image';
import Image from '../../../../../Image';
import { GalleryImageProps } from './types';

const GalleryImage = (props: GalleryImageProps): ReactElement => {
  const { alt = '', boringType, path, srcSize, isActive = false, onClick } = props;

  return (
    <ClickableImage
      borderRadius='lg'
      ratio={1 / 1}
      isActive={isActive}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClick}
    >
      <Image
        alt={alt}
        borderRadius='lg'
        boringType={boringType}
        thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${path}`}
        fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${path}`}
      />
    </ClickableImage>
  );
};

export default GalleryImage;
