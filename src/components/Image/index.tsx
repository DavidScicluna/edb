import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { useTheme, useColorMode, Image as CUIImage } from '@chakra-ui/react';
import _ from 'lodash';

import { useImageOnLoad } from '../../common/hooks';
import { handleReturnBoringSrc } from '../../common/utils';
import { Theme } from '../../theme/types';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const { css, handleIsLoaded } = useImageOnLoad(theme);

  const { mediaType, alt, src, size, ...rest } = props;

  const [fallbackSrc, setFallbackSrc] = useState<string>('');

  /**
   * This method will return the url for the fallback src
   */
  const handleFallbackSrc = useCallback(
    _.debounce(() => {
      const fallbackSrc: string = handleReturnBoringSrc(
        mediaType === 'person' ? 'beam' : 'marble',
        colorMode === 'light' ? 400 : 500,
        alt
      );

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
