import { ReactElement } from 'react';

import { AspectRatio } from '@chakra-ui/react';


import { ImageViewerProps } from './types';

import { handleReturnImageOrientation } from '../../../../common/utils';
import Image from '../../../Image';

const ImageViewer = (props: ImageViewerProps): ReactElement => {
  const { alt = '', width, height, aspect_ratio, file_path, boringType, srcSize } = props;

  const orientation = handleReturnImageOrientation(width || 0, height || 0);

  return (
    <AspectRatio width='100%' height={orientation === 'landscape' ? 'auto' : '100%'} ratio={aspect_ratio}>
      <Image
        alt={alt}
        borderRadius='none'
        boringType={boringType}
        thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${file_path}`}
        fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${file_path}`}
      />
    </AspectRatio>
  );
};

export default ImageViewer;
