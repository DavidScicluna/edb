import { ReactElement } from 'react';

import ClickableImage from '../../../../../Clickable/Image';
import Image from '../../../../../Image';
import { PhotoProps } from './types';

const Photo = (props: PhotoProps): ReactElement => {
  const { photo, name, type, mediaType, isActive = false, onClickImage } = props;

  return (
    <ClickableImage
      borderRadius='lg'
      ratio={1 / 1}
      isActive={isActive}
      onClick={() => onClickImage(photo.file_path, type)}
    >
      <Image
        alt={`${name ? `"${name}"` : ''} image`}
        maxWidth='none'
        height='100%'
        borderRadius='base'
        mediaType={mediaType}
        thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w45${photo.file_path}`}
        fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${photo.file_path}`}
      />
    </ClickableImage>
  );
};

export default Photo;
