import React, { ReactElement, UIEvent, SyntheticEvent, useRef, useState, useCallback, useEffect } from 'react';

import { HStack } from '@chakra-ui/react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import Arrow from './components/Arrow';
import { HorizontalScrollProps, ScrollButtonsState } from './types';

const defaultScrollButtonsState = {
  left: true,
  right: false
};

const HorizontalScroll = (props: HorizontalScrollProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();

  const { children, width, spacing } = props;

  const [scrollButtons, setScrollButtons] = useState<ScrollButtonsState>(defaultScrollButtonsState);
  const [resetScrollButtons, setResetScrollButtons] = useState<boolean>(false);

  const handleContainerRef = useCallback(
    _.debounce((ref: HTMLDivElement | null) => {
      if (ref) {
        const maxScroll = ref.scrollLeft + ref.offsetWidth;

        const isLeftDisabled = ref.scrollLeft === 0;
        const isRightDisabled =
          ref.scrollLeft === 0 ? ref.scrollWidth <= ref.offsetWidth : maxScroll >= ref.scrollWidth;

        setScrollButtons({
          left: isLeftDisabled,
          right: isRightDisabled
        });
        setResetScrollButtons(isLeftDisabled || isRightDisabled ? true : false);
      }
    }, 250),
    []
  );

  const handleScrollChange = (event: UIEvent<HTMLDivElement, globalThis.UIEvent> | SyntheticEvent<HTMLDivElement>) => {
    handleContainerRef(event.currentTarget);
  };

  /**
   * This method will either scroll left or right depending on the direction passed as a param
   *
   * @param direction - The direction to scroll to
   */
  const handleScrollClick = useCallback(
    (direction: 'left' | 'right') => {
      if (containerRef && containerRef.current) {
        if (direction === 'left') {
          containerRef.current.scrollLeft = containerRef.current.scrollLeft - 10;
        } else {
          containerRef.current.scrollLeft = containerRef.current.scrollLeft + 10;
        }
      }
    },
    [containerRef]
  );

  useEffect(() => {
    setResetScrollButtons(true);
  }, [location]);

  useEffect(() => {
    const handleResize = (): void => {
      handleContainerRef(containerRef.current);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HStack width={width || '100%'} maxWidth={width || '100%'} position='relative' spacing={0}>
      {/* Left Arrow Button */}
      <Arrow
        direction='left'
        isDisabled={scrollButtons.left}
        reset={resetScrollButtons}
        onScrollClick={handleScrollClick}
      />

      {/* Scrollable content */}
      <HStack
        ref={containerRef}
        width='100%'
        maxWidth='100%'
        overflowX='auto'
        spacing={spacing ? spacing : 1}
        onLoad={(event) => handleScrollChange(event)}
        onScroll={(event) => handleScrollChange(event)}
        sx={{
          // CSS to hide scrollbar
          'scrollbarWidth': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}>
        {children}
      </HStack>

      {/* Right Arrow Button */}
      <Arrow
        direction='right'
        isDisabled={scrollButtons.right}
        reset={resetScrollButtons}
        onScrollClick={handleScrollClick}
      />
    </HStack>
  );
};

export default HorizontalScroll;
