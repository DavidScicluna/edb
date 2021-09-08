import React, { ReactElement } from 'react';

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
      onClick={() => onClickImage(photo.file_path, type)}>
      <Image
        alt={`${name ? `"${name}"` : ''} image`}
        maxWidth='none'
        height='100%'
        borderRadius='base'
        mediaType={mediaType}
        src={photo.file_path}
        size={{
          thumbnail: 'w45',
          full: 'original'
        }}
      />
    </ClickableImage>
  );
};

export default Photo;
