import React, { ReactElement } from 'react';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { ImageProps } from './types';

const width = ['185px', '205px', '230px'];

const PhotoImage = (props: ImageProps): ReactElement => {
  const { image, name, isLoading = false, onClickImage } = props;

  return (
    <ClickableImage
      width={width}
      borderRadius='base'
      ratio={2 / 3}
      isDisabled={isLoading}
      onClick={image ? () => onClickImage(image) : undefined}>
      <Skeleton isLoaded={!isLoading} borderRadius='base'>
        <Image
          alt={`${name ? `"${name}"` : ''} image`}
          maxWidth='none'
          height='100%'
          borderRadius='base'
          mediaType='person'
          src={image?.file_path || ''}
          size={{
            thumbnail: 'w45',
            full: 'original'
          }}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default PhotoImage;
