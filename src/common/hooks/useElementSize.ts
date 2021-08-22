import { RefObject, useCallback, useEffect, useState } from 'react';

import useEventListener from './useEventListener';

type Size = {
  width: number;
  height: number;
};

/**
 * https://usehooks-typescript.com/react-hook/use-element-size
 */
const useElementSize = <T extends HTMLElement = HTMLDivElement>(elementRef: RefObject<T>): Size => {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0
  });

  // Prevent too many rendering using useCallback
  const updateSize = useCallback(() => {
    const node = elementRef?.current;

    if (node) {
      setSize({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0
      });
    }
  }, [elementRef]);

  // Initial size on mount
  useEffect(() => updateSize(), []);

  useEventListener('resize', updateSize);

  return size;
};

export default useElementSize;
