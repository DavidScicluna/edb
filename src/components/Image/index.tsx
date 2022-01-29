import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { useTheme, useColorMode, Image as CUIImage } from '@chakra-ui/react';
import _ from 'lodash';

import * as fallback from '../../common/assets/fallback';
import { useImageOnLoad } from '../../common/hooks';
import { handleReturnBoringSrc } from '../../common/utils';
import { Theme } from '../../theme/types';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const { css, handleIsLoaded } = useImageOnLoad(theme);

  const { alt, thumbnailSrc, fullSrc, boringType, onError, onLoad, ...rest } = props;

  const [fallbackSrc, setFallbackSrc] = useState<string>('');

  /**
   * This method will return the url for the fallback src
   */
  const handleFallbackSrc = useCallback(
    _.debounce(() => {
      const fallbackSrc: string = handleReturnBoringSrc(boringType, colorMode === 'light' ? 400 : 500);

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
        maxWidth='none'
        height='100%'
        // onError={(error) => {
        //   handleIsLoaded(true);

        //   if (onError) {
        //     onError(error);
        //   }
        // }}
        // onLoad={(event) => {
        //   handleIsLoaded(true);

        //   if (onLoad) {
        //     onLoad(event);
        //   }
        // }}
        onError={onError ? (error) => onError(error) : undefined}
        onLoad={onLoad ? (event) => onLoad(event) : undefined}
        src={thumbnailSrc}
        fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
        sx={{ ...css.thumbnail }}
      />

      {/* Full size image */}
      <CUIImage
        {...rest}
        ref={imageRef}
        alt={alt}
        position='absolute'
        onError={(error) => {
          handleIsLoaded(true);

          if (onError) {
            onError(error);
          }
        }}
        onLoad={(event) => {
          handleIsLoaded(true);

          if (onLoad) {
            onLoad(event);
          }
        }}
        src={fullSrc}
        fallbackSrc={fallbackSrc}
        sx={{ ...css.fullSize }}
      />
    </>
  );
};

export default Image;
