import React, { ReactElement, UIEvent, SyntheticEvent, useState, useCallback, useEffect } from 'react';

import { HStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Arrow from './components/Arrow';
import { HorizontalScrollProps, ScrollButtonsState } from './types';

const defaultScrollButtonsState = {
  left: true,
  right: false
};

const HorizontalScroll = (props: HorizontalScrollProps): ReactElement => {
  const location = useLocation();

  const { children, width, spacing } = props;

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const [scrollButtons, setScrollButtons] = useState<ScrollButtonsState>(defaultScrollButtonsState);
  const [resetScrollButtons, setResetScrollButtons] = useState<boolean>(false);

  const handleContainerRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      const maxScroll = ref.scrollLeft + ref.offsetWidth;

      const isLeftDisabled = ref.scrollLeft === 0;
      const isRightDisabled = ref.scrollLeft === 0 ? ref.scrollWidth <= ref.offsetWidth : maxScroll >= ref.scrollWidth;

      setScrollButtons({
        left: isLeftDisabled,
        right: isRightDisabled
      });
      setContainerRef(ref);
      setResetScrollButtons(isLeftDisabled || isRightDisabled ? true : false);
    }
  }, []);

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
      if (containerRef) {
        if (direction === 'left') {
          containerRef.scrollLeft = containerRef.scrollLeft - 10;
        } else {
          containerRef.scrollLeft = containerRef.scrollLeft + 10;
        }
      }
    },
    [containerRef]
  );

  useEffect(() => {
    setResetScrollButtons(true);
  }, [location]);

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
        ref={handleContainerRef}
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
