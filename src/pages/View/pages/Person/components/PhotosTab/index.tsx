import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Photos from './components/Photos';
import TaggedPhotos from './components/TaggedPhotos';
import { PhotosTabProps } from './types';

const PhotosTab = (props: PhotosTabProps): ReactElement => {
  const { images = [], taggedImages = [], isLoading, isError, isSuccess, ...rest } = props;

  return (
    <VStack width='100%' spacing={4}>
      <Photos
        {...rest}
        images={images}
        isLoading={isLoading?.images}
        isError={isError?.images}
        isSuccess={isSuccess?.images}
      />

      <TaggedPhotos
        {...rest}
        taggedImages={taggedImages}
        isLoading={isLoading?.taggedImages}
        isError={isError?.taggedImages}
        isSuccess={isSuccess?.taggedImages}
      />
    </VStack>
  );
};

export default PhotosTab;
