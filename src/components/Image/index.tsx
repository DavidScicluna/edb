import { ReactElement, useState } from 'react';

import { useColorMode, useBoolean, Center, Image as CUIImage, Fade } from '@chakra-ui/react';

import * as fallback from '../../common/assets/fallback';
import { handleReturnBoringSrc } from '../../common/utils';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { alt, thumbnailSrc, fullSrc, boringType, borderRadius, onError, onLoad, ...rest } = props;

  const [fallbackSrc] = useState<string>(handleReturnBoringSrc(boringType, colorMode === 'light' ? 400 : 500));

  const [isThumbnailError, setIsThumbnaiError] = useBoolean();
  const [isFullLoaded, setIsFullLoaded] = useBoolean();
  const [isFullError, setIsFullError] = useBoolean();

  return (
    <Center position='relative' width='100%' maxWidth='none' height='100%' borderRadius={borderRadius}>
      {/* Fallback image */}
      <Fade
        in={isThumbnailError && isFullError}
        unmountOnExit
        style={{ position: 'absolute', width: 'inherit', maxWidth: 'inherit', height: 'inherit' }}
      >
        <CUIImage
          {...rest}
          maxWidth='none'
          height='inherit'
          alt={`${alt} fallback image`}
          position='absolute'
          borderRadius={borderRadius}
          src={fallbackSrc}
          fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
        />
      </Fade>

      {/* Thumbnail image */}
      <Fade
        in={!isFullLoaded && !isThumbnailError}
        unmountOnExit
        style={{ position: 'absolute', width: 'inherit', maxWidth: 'inherit', height: 'inherit' }}
      >
        <CUIImage
          {...rest}
          maxWidth='none'
          height='inherit'
          alt={`${alt} thumbnail`}
          position='absolute'
          borderRadius={borderRadius}
          onError={(error) => {
            setIsThumbnaiError.on();

            if (onError) {
              onError(error);
            }
          }}
          onLoad={(event) => {
            setIsThumbnaiError.off();

            if (onLoad) {
              onLoad(event);
            }
          }}
          src={thumbnailSrc}
          fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
        />
      </Fade>

      {/* Full size image */}
      <Fade
        in={!isFullError}
        unmountOnExit
        style={{ position: 'absolute', width: 'inherit', maxWidth: 'inherit', height: 'inherit' }}
      >
        <CUIImage
          {...rest}
          alt={alt}
          position='absolute'
          borderRadius={borderRadius}
          onError={(error) => {
            setIsFullLoaded.off();
            setIsFullError.on();

            if (onError) {
              onError(error);
            }
          }}
          onLoad={(event) => {
            setIsFullLoaded.on();
            setIsFullError.off();

            if (onLoad) {
              onLoad(event);
            }
          }}
          src={fullSrc}
        />
      </Fade>
    </Center>
  );
};

export default Image;
