import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { useTheme, Image as CUIImage } from '@chakra-ui/react';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { useImageOnLoad } from '../../common/hooks';
import { handleReturnFallbackSrc } from '../../common/utils';
import { Theme } from '../../theme/types';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const theme = useTheme<Theme>();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const { width: elementWidth } = useElementSize(imageRef);
  const { css, isLoaded, handleIsLoaded } = useImageOnLoad(theme);

  const { mediaType, alt, src, size, ...rest } = props;

  const [fallbackSrc, setFallbackSrc] = useState<string>('');

  /**
   * This method will return the url for the fallback src
   */
  const handleFallbackSrc = useCallback(
    _.debounce(() => {
      const fallbackSrc: string = handleReturnFallbackSrc(mediaType, String(isLoaded ? elementWidth || 780 : 50), alt);

      setFallbackSrc(fallbackSrc);
    }, 500),
    []
  );

  useEffect(() => handleFallbackSrc(), []);

  return (
    <>
      {/* Thumbnail to load faster */}
      <CUIImage
        {...rest}
        ref={imageRef}
        alt={`${alt} thumbnail`}
        position='absolute'
        onError={() => handleIsLoaded(true)}
        src={`${process.env.REACT_APP_IMAGE_URL}/${size.thumbnail}${src}`}
        ignoreFallback
        sx={{ ...css.thumbnail }}
      />

      {/* Full size image */}
      <CUIImage
        {...rest}
        ref={imageRef}
        alt={alt}
        position='absolute'
        onLoad={() => handleIsLoaded(true)}
        src={`${process.env.REACT_APP_IMAGE_URL}/${size.full}${src}`}
        fallbackSrc={fallbackSrc}
        sx={{ ...css.fullSize }}
      />
    </>
  );
};

export default Image;
