import React, { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { useTheme, Image as CUIImage } from '@chakra-ui/react';
import _ from 'lodash';

import { useElementSize, useImageOnLoad } from '../../common/hooks';
import utils from '../../common/utils/utils';
import { Theme } from '../../theme/types';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const theme = useTheme<Theme>();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const { width: elementWidth } = useElementSize(imageRef);
  const { css, handleIsLoaded } = useImageOnLoad(theme);

  const { width, mediaType, alt, src, size, ...rest } = props;

  const [fallbackSrc, setFallbackSrc] = useState<string>('');

  /**
   * This method will return the url for the fallback src
   */
  const handleReturnFallbackSrc = useCallback(
    _.debounce(() => {
      const fallbackSrc: string = utils.handleReturnFallbackSrc(mediaType, String(elementWidth || 780), alt);

      setFallbackSrc(fallbackSrc);
    }, 500),
    []
  );

  console.log(fallbackSrc);

  useEffect(() => handleReturnFallbackSrc(), []);

  return (
    <>
      {/* Thumbnail to load faster */}
      <CUIImage
        {...rest}
        ref={imageRef}
        width={width}
        position='absolute'
        alt={`${alt} thumbnail`}
        onError={() => handleIsLoaded(true)}
        src={`${process.env.REACT_APP_IMAGE_URL}/${size.thumbnail}${src}`}
        fallbackSrc={fallbackSrc}
        sx={{ ...css.thumbnail }}
      />

      {/* Full size image */}
      <CUIImage
        {...rest}
        ref={imageRef}
        width={width}
        position='absolute'
        alt={alt}
        onLoad={() => handleIsLoaded(true)}
        src={`${process.env.REACT_APP_IMAGE_URL}/${size.full}${src}`}
        fallbackSrc={fallbackSrc}
        sx={{ ...css.fullSize }}
      />
    </>
  );
};

export default Image;
