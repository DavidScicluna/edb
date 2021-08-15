import React, { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { useColorMode, VStack, Box, useMediaQuery } from '@chakra-ui/react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import Card from '../../Card';
import Grid from './components/Grid';
import Header from './components/Header';
import { HorizontalGridProps, ScrollButtonsState, Direction } from './types';

const defaultScrollButtonsState = {
  left: true,
  right: false
};

const HorizontalGrid = (props: HorizontalGridProps): ReactElement => {
  const { colorMode } = useColorMode();

  const gridRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();

  const { children, title, footer, isLoading, variant = 'transparent' } = props;

  const [scrollButtons, setScrollButtons] = useState<ScrollButtonsState>(defaultScrollButtonsState);
  const [resetScrollButtons, setResetScrollButtons] = useState<boolean>(false);

  const handleGridRef = useCallback(
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
      } else {
        handleGridRef(gridRef.current);
      }
    }, 50),
    [gridRef]
  );

  const handleScrollChange = useCallback(() => handleGridRef(gridRef.current), [gridRef, handleGridRef]);

  /**
   * This method will either scroll left or right depending on the direction passed as a param
   *
   * @param direction - The direction to scroll to
   */
  const handleScrollClick = useCallback(
    (direction: Direction) => {
      if (gridRef && gridRef.current) {
        if (direction === 'left') {
          gridRef.current.scrollLeft = gridRef.current.scrollLeft - 10;
        } else {
          gridRef.current.scrollLeft = gridRef.current.scrollLeft + 10;
        }
      }
    },
    [gridRef]
  );

  useEffect(() => {
    setResetScrollButtons(true);
  }, [location]);

  useEffect(() => {
    handleScrollChange();

    document.addEventListener('resize', handleScrollChange);

    return () => {
      document.removeEventListener('resize', handleScrollChange);
    };
  }, []);

  return (
    <Card isFullWidth variant={variant} px={variant === 'outlined' ? 2 : 0}>
      <VStack width='100%' spacing={0}>
        {/* Header */}
        <Header
          title={title}
          isLoading={isLoading}
          reset={resetScrollButtons}
          scrollButtons={scrollButtons}
          variant={variant}
          onScrollClick={handleScrollClick}
        />

        {/* Grid */}
        <Grid gridRef={gridRef} variant={variant} handleScrollChange={handleScrollChange}>
          {children}
        </Grid>

        {/* Footer */}
        {footer ? (
          <Box
            width='100%'
            borderTop={variant === 'outlined' ? 'solid2' : 'none'}
            borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            pt={1}
            pb={variant === 'outlined' ? 1 : 0}>
            {footer}
          </Box>
        ) : null}
      </VStack>
    </Card>
  );
};

export default HorizontalGrid;
