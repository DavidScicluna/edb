import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { AspectRatio, Image as CUIImage } from '@chakra-ui/react';
import _ from 'lodash';

import { handleReturnFallbackSrc } from '../../../../../../../../../../common/utils';
import Skeleton from '../../../../../../../../../../components/Skeleton';
import { ImageProps } from './types';

const Image = ({ alt, avatar, isLoading = true }: ImageProps): ReactElement => {
  const [fallbackSrc, setFallbackSrc] = useState<string>('');

  /**
   * This method will check if avatar url has a / in the beginning of the string
   * If so it will remove it
   *
   * @returns String - Avatar URL
   */
  const handleSrc = (): string => {
    if (avatar && avatar.charAt(0) === '/') {
      return avatar.substring(1);
    }
    return avatar || '';
  };

  /**
   * This method will return the url for the fallback src
   */
  const handleFallbackSrc = useCallback(
    _.debounce(() => {
      const fallbackSrc: string = handleReturnFallbackSrc('person', '780', alt);

      setFallbackSrc(fallbackSrc);
    }, 500),
    []
  );

  useEffect(() => handleFallbackSrc(), []);

  return (
    <AspectRatio width='48px' borderRadius='full' ratio={1 / 1}>
      <Skeleton borderRadius='full' isLoaded={!isLoading}>
        <CUIImage alt={alt} borderRadius='full' src={handleSrc() || ''} fallbackSrc={fallbackSrc} />
      </Skeleton>
    </AspectRatio>
  );
};

export default Image;
