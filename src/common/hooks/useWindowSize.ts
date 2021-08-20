import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

/**
 * https://usehooks-typescript.com/react-hook/use-window-size
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set size at the first client-side load
    handler();

    window.addEventListener('resize', handler);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handler);
  }, []);

  return windowSize;
};

export default useWindowSize;
