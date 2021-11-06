import { CSSProperties, useState } from 'react';

import { Theme } from '../../theme/types';

type ImageStyle = {
  thumbnail: CSSProperties;
  fullSize: CSSProperties;
};

type ImageOnLoadType = {
  css: ImageStyle;
  isLoaded: boolean;
  handleIsLoaded: (bool: boolean) => void;
};

/**
 * Based on: https://usehooks-typescript.com/react-hook/use-image-on-load
 */
const useImageOnLoad = (theme: Theme): ImageOnLoadType => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleIsLoaded = (bool: boolean) => {
    setIsLoaded(bool);
  };

  const css: ImageStyle = {
    // Thumbnail style.
    thumbnail: {
      opacity: isLoaded ? 0 : 1,
      visibility: isLoaded ? 'hidden' : 'visible',
      transition: `${theme.transition.duration.slower} ${theme.transition.easing['ease-in-out']}`
    },
    // Full image style.
    fullSize: {
      opacity: isLoaded ? 1 : 0,
      visibility: isLoaded ? 'visible' : 'hidden',
      transition: `${theme.transition.duration.slower} ${theme.transition.easing['ease-in-out']}`
    }
  };

  return { css, isLoaded, handleIsLoaded };
};

export default useImageOnLoad;
