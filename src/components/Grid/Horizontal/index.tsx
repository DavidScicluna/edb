import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { useBoolean, HStack } from '@chakra-ui/react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';

import { handleIsTouchDevice } from '../../../common/utils';
import Panel from '../../Panel';
import Arrow from './components/Arrow';
import Grid from './components/Grid';
import { HorizontalGridProps, ScrollButtonsState, Direction } from './types';

const defaultScrollButtonsState = {
  left: true,
  right: false
};

const HorizontalGrid = (props: HorizontalGridProps): ReactElement => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const { width } = useWindowSize();

  const location = useLocation();

  const {
    children,
    title,
    footer,
    isLoading = true,
    hasDivider = false,
    resetScroll = false,
    variant = 'transparent'
  } = props;

  const [scrollButtons, setScrollButtons] = useState<ScrollButtonsState>(defaultScrollButtonsState);
  const [resetScrollButtons, setResetScrollButtons] = useBoolean();

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

        if (isLeftDisabled || isRightDisabled) {
          setResetScrollButtons.on();
        } else {
          setResetScrollButtons.off();
        }
      } else {
        handleGridRef(gridRef.current);
      }
    }, 50),
    [gridRef]
  );

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

  const handleResetScrollButton = useCallback(() => {
    setResetScrollButtons.on();

    if (gridRef && gridRef.current) {
      gridRef.current.scrollLeft = 0;

      handleGridRef(gridRef.current);
    }
  }, [gridRef, setResetScrollButtons, handleGridRef]);

  useEffect(() => handleResetScrollButton(), [location, resetScroll]);

  useEffect(() => {
    handleGridRef(gridRef.current);
  }, [width]);

  return (
    <Panel isFullWidth hasDivider={hasDivider} variant={variant} size='xs'>
      {{
        header: {
          title,
          actions: !handleIsTouchDevice() ? (
            <HStack spacing={1}>
              <Arrow
                direction='left'
                isDisabled={scrollButtons.left}
                isLoading={isLoading}
                reset={resetScrollButtons}
                onScrollClick={handleScrollClick}
                variant={variant}
              />
              <Arrow
                direction='right'
                isDisabled={scrollButtons.right}
                isLoading={isLoading}
                reset={resetScrollButtons}
                onScrollClick={handleScrollClick}
                variant={variant}
              />
            </HStack>
          ) : undefined
        },
        body: (
          <Grid
            gridRef={gridRef}
            hasDivider={hasDivider}
            handleScrollChange={() => handleGridRef(gridRef.current)}
            variant={variant}>
            {children}
          </Grid>
        ),
        footer
      }}
    </Panel>
  );
};

export default HorizontalGrid;
