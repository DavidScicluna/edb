import { ReactElement, useState } from 'react';

import { useColorMode, useBoolean, Center, Image as CUIImage, Fade } from '@chakra-ui/react';

import * as fallback from '../../common/assets/fallback';
import { handleReturnBoringSrc } from '../../common/utils';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { width, maxWidth, alt, thumbnailSrc, fullSrc, boringType, borderRadius, onError, onLoad, ...rest } = props;

  const [fallbackSrc] = useState<string>(handleReturnBoringSrc(boringType, colorMode === 'light' ? 400 : 500));

  const [isThumbnailError, setIsThumbnaiError] = useBoolean();
  const [isFullLoaded, setIsFullLoaded] = useBoolean();
  const [isFullError, setIsFullError] = useBoolean();

  const centerProps = {
    width: '100%',
    height: '100%',
    borderRadius
  };

  return (
    <Center position='relative' {...centerProps}>
      {/* Fallback image */}
      <Center as={Fade} position='absolute' {...centerProps} in={isThumbnailError && isFullError} unmountOnExit>
        <CUIImage
          {...rest}
          width={width || 'auto'}
          height={width ? 'auto' : '100%'}
          maxWidth={maxWidth || 'none'}
          alt={`${alt} fallback image`}
          position='absolute'
          borderRadius={borderRadius}
          src={fallbackSrc}
          fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
        />
      </Center>

      {/* Thumbnail image */}
      <Center as={Fade} position='absolute' {...centerProps} in={!isFullLoaded && !isThumbnailError} unmountOnExit>
        <CUIImage
          {...rest}
          width={width || 'auto'}
          height={width ? 'auto' : '100%'}
          maxWidth={maxWidth || 'none'}
          position='absolute'
          alt={`${alt} thumbnail`}
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
      </Center>

      {/* Full size image */}
      <Center as={Fade} position='absolute' {...centerProps} in={!isFullError} unmountOnExit>
        <CUIImage
          {...rest}
          width={width || 'auto'}
          height={width ? 'auto' : '100%'}
          maxWidth={maxWidth || 'none'}
          position='absolute'
          alt={alt}
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
      </Center>
    </Center>
  );
};

export default Image;
